import { makeAutoObservable, runInAction } from "mobx";
import { getCountryByName } from "../api/apiService"; // Имитация API
import debounce from "../utils/debounce";

class AutocompleteViewModel {
  inputText: string = "";
  suggestions: Array<{ name: string; fullName: string; flag: string }> = [];
  maxSuggestions: number;
  fetchSuggestionsDebounced: (query: string) => void;

  constructor(maxSuggestions: number = 5) {
    this.inputText = "";
    this.suggestions = [];
    this.maxSuggestions = maxSuggestions;
    this.fetchSuggestionsDebounced = debounce(this.fetchSuggestions.bind(this), 300);
    makeAutoObservable(this);
  }

  setInputText(newText: string) {
    this.inputText = newText;
    this.fetchSuggestionsDebounced(newText);
  }

  async fetchSuggestions(query: string) {
    if (query.length > 0) {
      const response = await getCountryByName(query);
      this.suggestions = response.slice(0, this.maxSuggestions);
    } else {
      this.suggestions = [];
    }
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
