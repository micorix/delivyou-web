import {createGlobalStyle} from "styled-components";

require('normalize.css')

const GlobalStyle = createGlobalStyle`
    body{
        font-family: Roboto;
        background:rgba(0,0,0, 0.1);
    }
`;

export default GlobalStyle
