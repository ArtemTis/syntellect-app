import { makeAutoObservable } from "mobx";

class InputViewModel {
  text: string = ""; 

  constructor() {
    makeAutoObservable(this); 
  }

  setText(newText: string) {
    this.text = newText;
  }

  clearText() {
    this.text = "";
  }

  setHelloWorld() {
    this.text = "Hello world!";
  }

  isNumber() {
    return !isNaN(Number(this.text));
  }
}

const inputViewModel1 = new InputViewModel();
const inputViewModel2 = new InputViewModel();

export {inputViewModel1, inputViewModel2};
