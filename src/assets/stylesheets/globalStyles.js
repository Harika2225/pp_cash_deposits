import { createGlobalStyle } from "styled-components";
import fontFace from "./fontFace";
const GlobalStyle = createGlobalStyle`
  ${fontFace}

  html,
  body {
    height: 100%;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Gotham A', 'Gotham B', Helvetica, sans-serif;
    font-size: 14px;

    h1{
      font-size: 36px;
      margin: 20px 0px 0px; 
      color: #333
    }
    h2{
      font-size: 30px;
      color: #333;
    }
    
    & > div {
      display: flex; /* This is a hack for sticky footer on IE */
      flex-direction: column;
    }
  }

  * {
    box-sizing: border-box;
  }

  label{
    color: #333
  }
  select,
  input,
  textarea,
  button {
    font-family: 'Gotham A', 'Gotham B', Helvetica, sans-serif;
  }
`;

export default GlobalStyle;
