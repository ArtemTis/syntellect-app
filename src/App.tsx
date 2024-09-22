import React from "react";
import "./App.css";
import FirstControl from "./components/FirstControl";
import SecondControl from "./components/SecondControl";
import Autocomplete from "./components/Autocomplete/Autocomplete";

function App() {
  return <div>
    <FirstControl/>
    <SecondControl/>

    <Autocomplete maxSuggestions={3}/>
    <Autocomplete maxSuggestions={10}/>
  </div>;
}

export default App;
