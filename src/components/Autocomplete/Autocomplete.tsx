import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import AutocompleteViewModel from "../../viewModels/autocompleteVM";
import './Autocomplete.css'

interface AutocompleteProps {
    maxSuggestions: number;
}

const Autocomplete: React.FC<AutocompleteProps> = observer(({ maxSuggestions }) => {
    const [viewModel] = useState(() => new AutocompleteViewModel(maxSuggestions));

    const autocompleteRef = useRef<HTMLDivElement>(null); 


    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
            viewModel.clearSuggestions(); 
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside); 
      };
    }, [autocompleteRef, viewModel.clearSuggestions]);

    return (
        <div ref={autocompleteRef} className="autocomplete-wrapper">
            <input
                type="text"
                value={viewModel.inputText}
                onChange={(e) => viewModel.setInputText(e.target.value)}
                style={{ width: "100%" }}
                placeholder={`Autocomplete ${maxSuggestions}`}
            />
            {viewModel.suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {viewModel.suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => viewModel.selectSuggestion(suggestion.name)}
                        >
                            <span>{suggestion.name}</span> - <span>{suggestion.fullName}</span>
                            <img src={suggestion.flag} alt={suggestion.name} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default Autocomplete;
