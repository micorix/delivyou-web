import styled from "styled-components";

export const Input = styled.input`
    padding: 10px;
    border: 2px solid #aaa;
    border-radius: 3px;
    box-sizing: border-box;
    width: 100%;
    &:focus{
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;
export const Select = styled.select`
    padding: 5px;
    border: 2px solid #aaa;
    border-radius: 3px;
    box-sizing: border-box;
    background: white;
    width: 100%;
    &:focus{
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;
export const InputGroup = styled.div`
    margin-top: 1em;
    &:first-of-type{
        margin-top: 0;
    }
`
export const InputAddonGroup = styled.div`
    display: flex;
    button{
        border: none;
        color: white;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${props => props.theme.colors.primary};
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
`;
export const Button = styled.button`
    margin-top: 2em;
    padding: 10px 2em;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 3px;
`;
