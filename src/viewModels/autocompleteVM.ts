import { makeAutoObservable } from "mobx";
import { CountryInfo, getCountryByName } from "../api/apiService";


class AutocompleteViewModel {
  inputText: string = "";
  suggestions: Array<{ name: string; fullName: string; flag: string }> = [];
  maxSuggestions: number;

  constructor(maxSuggestions: number = 5) {
    this.inputText = ""; // Явная инициализация строки
    this.suggestions = []; // Явная инициализация массива
    this.maxSuggestions = maxSuggestions; // Получение максимального количества подсказок
    makeAutoObservable(this); // MobX автоматически отслеживает изменения в полях
  }

  setInputText(newText: string) {
    this.inputText = newText;
    this.fetchSuggestions(newText);
  }

  async fetchSuggestions(query: string) {
    if (query.length > 0) {
      const request = this.debounce<CountryInfo[]>(getCountryByName, 100);
      const response = await request(query);

      this.suggestions = response.slice(0, this.maxSuggestions);
    } else {
      this.suggestions = [];
    }
  }

  debounce<T>(callback: (...args: any[]) => Promise<T>, delay: number) {
    let timer: any = null;

    return (...args: any[]): Promise<T> => {
      return new Promise((resolve, reject) => {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(async () => {
          try {
            const result = await callback(...args);
            console.log(result);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    };
  }


  selectSuggestion(suggestion: string) {
    this.inputText = suggestion;
    this.suggestions = [];
  }

  clearSuggestions() {
    this.suggestions = [];
  }
}


export default AutocompleteViewModel;
