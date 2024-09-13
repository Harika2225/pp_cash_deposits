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
      font-size:13px;
    }
    h1{
      font-size: 36px;
      margin: 20px 0px 0px; 
      color: #333
    }
    h2{
      font-size: 30px;
      color: #333;
    }
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px; 
      background-color: #fff;
      z-index: 1030; 
    }
    
    .dropdown-menu {
      max-height: 500px;
      font-size: 14px;
      overflow-y: auto;
      border-top-color: transparent;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      padding: 5px 0px;
      position: absolute;
    }
    .dropdown-menu.show{
      margin-top: 5px !important
    }
    .dropdown-menu .dropdown-item {
      font-size: 14px;
      padding: 2px 20px;
    }

    .dropdown-menu::-webkit-scrollbar {
      width: 8px; 
    }
    .dropdown-menu::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.04); 
    }
    .dropdown-menu::-webkit-scrollbar-track {
      background-color: #fff;
    }
    img{
      margin-left: 10px;
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
