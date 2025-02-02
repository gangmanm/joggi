"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-2ExtraLight.ttf") format("truetype");
    font-weight: 200; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-3Light.ttf") format("truetype");
    font-weight: 300; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-4Regular.ttf") format("truetype");
    font-weight: 400; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-5Medium.ttf") format("truetype");
    font-weight: 500; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-7Bold.ttf") format("truetype");
    font-weight: 700; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-8ExtraBold.ttf") format("truetype");
    font-weight: 800; 
    font-style: normal;
  }
  @font-face {
    font-family: "Paperlogy";
    src: url("/fonts/Paperlogy-9Black.ttf") format("truetype");
    font-weight: 900; 
    font-style: normal;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }

  html, body {
    width: 100vw;
    height: 100vh;
    font-family: "Paperlogy", "Pretendard", Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5; 
  }

  input, textarea {
    all: unset; 
    font-family: inherit; 
    font-size: inherit; 
  }
  
`;

export default GlobalStyle;
