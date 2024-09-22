import React from "react";
import { observer } from "mobx-react-lite";
import { inputViewModel2 } from "../viewModels/inputVM";


const SecondControl: React.FC = observer(() => {
    const handleAlertText = () => {
        alert(inputViewModel2.text);
    };

    const handleCheckNumber = () => {
        if (inputViewModel2.isNumber() && inputViewModel2.text.length !== 0) {
            alert(`Это число: ${inputViewModel2.text}`);
        } else if (inputViewModel2.text.length === 0) {
            alert('Поле пустое')
        } else {
            alert("Введено не число!");
        }
    };

    return (
        <div className="control-wrapper">
            <button onClick={handleCheckNumber}>Check Number</button>
            <input
                type="text"
                value={inputViewModel2.text}
                onChange={(e) => inputViewModel2.setText(e.target.value)}
            />
            <button onClick={handleAlertText}>Alert Text</button>
        </div>
    );
});

export default SecondControl;
