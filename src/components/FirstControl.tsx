import React from "react";
import { observer } from "mobx-react-lite";
import { inputViewModel1 } from "../viewModels/inputVM";


const FirstControl: React.FC = observer(() => {

  const clearInput = () => {
    inputViewModel1.clearText()
  }
  const setHello = () => {
    inputViewModel1.setHelloWorld()
  }
  return (
    <div className='control-wrapper'>
      <input
        type="text"
        value={inputViewModel1.text}
        onChange={(e) => inputViewModel1.setText(e.target.value)}
      />
      <button onClick={clearInput} >Clear</button>
      <button onClick={setHello} >Set "Hello World!"</button>
    </div>
  );
});

export default FirstControl;
