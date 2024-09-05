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

    span{
      font-size:13px
    }
    h1{
      font-size: 36px;
      margin: 20px 0px 0px; 
    }
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px; 
      background-color: #fff;
      z-index: 1030; 
      margin-bottom:20px;
  }
    & > div {
      display: flex; /* This is a hack for sticky footer on IE */
      flex-direction: column;
    }
  }

  * {
    box-sizing: border-box;
  }

  select,
  input,
  textarea,
  button {
    font-family: 'Gotham A', 'Gotham B', Helvetica, sans-serif;
  }
`;

export default GlobalStyle;
