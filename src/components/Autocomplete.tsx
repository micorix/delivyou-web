import React, {createRef, forwardRef, HTMLProps, useEffect, useState} from 'react';
import {Input} from "./FormControls";
import styled from "styled-components";


const AutocompleteWrapper = styled.div`
    position: relative;
    width: 100%;
`;
type SuggestionsListProps = {
    showSuggestions: boolean
}
const SuggestionsList = styled.ul<SuggestionsListProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: ${props => props.showSuggestions ? 'block' : 'none'};
    padding-inline-start: 0;
    z-index: 1;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    margin: 0;
    li{
        display: block;
        padding: 10px;
        transition: .2s all;
        background: white;
        outline: none;
        &:hover, &:focus{
            background: #e5e5eb;
        }
    }
`;


type Suggestion = string

type AutocompleteProps = any
const Autocomplete = (props: AutocompleteProps) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSugestions] = useState<boolean>(false);
    const inputRef = createRef<HTMLInputElement>();
    const handleChange = (e: any) => {
        e.persist();
        const value = e.target.value;
        const filteredSuggestions = value.trim().length > 0 ?
            props.suggestions.filter((suggestion: Suggestion) => suggestion.toLowerCase().includes(value.trim().toLowerCase()))
            : [];

        setFilteredSuggestions(filteredSuggestions);
        setShowSugestions(true);
        if(props.onChange)
            props.onChange(e.target.value);
    };
    const getSuggestion = (e: any) => {
        e.persist();

        if(e.keyCode === 13 || !e.keyCode){
            setFilteredSuggestions([]);
            setShowSugestions(false);
            if(inputRef.current)
                inputRef.current.focus()
            if(props.onChange)
                props.onChange(e.target.innerText);
        }
    };


     return (
         <AutocompleteWrapper>
             <Input onChange={handleChange} value={props.userInput} ref={inputRef}/>
             <SuggestionsList showSuggestions={showSuggestions}>
                 {
                     filteredSuggestions.map((suggestion: Suggestion) => (
                         <li
                             tabIndex={0}
                             key={suggestion}
                             onClick={getSuggestion}
                             onKeyUp={getSuggestion}>{suggestion}</li>
                     ))
                 }
             </SuggestionsList>
         </AutocompleteWrapper>
     );
};

export default Autocomplete;
