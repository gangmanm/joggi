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
    box-sizing: border-box; /* 박스 크기 계산 방식 설정 */
  }

  html, body {
    width: 100vw;
    height: 100vh;
    font-family: "Paperlogy", "Pretendard", Arial, Helvetica, sans-serif;
    overflow: hidden; /* 가로/세로 스크롤 방지 */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5; /* 배경색 설정 */
  }

  input, textarea {
    all: unset; /* 기본 스타일 초기화 */
    font-family: inherit; /* 부모 요소의 폰트 상속 */
    font-size: inherit; /* 부모 요소의 폰트 크기 상속 */
  }
`;

export default GlobalStyle;
