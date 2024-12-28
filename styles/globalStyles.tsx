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
    width: 100vw; /* 화면의 전체 너비를 차지 */
    height: 100vh; /* 화면의 전체 높이를 차지 */
    font-family: "Paperlogy", "Pretendard", Arial, Helvetica, sans-serif; /* 지정된 폰트 사용 */
    overflow: hidden; /* 스크롤 제거 */
    display: flex; /* 플렉스 컨테이너로 설정 */
    align-items: center; /* 수직 방향으로 중앙 정렬 */
    justify-content: center; /* 수평 방향으로 중앙 정렬 */
    background-color: #f5f5f5; /* 배경색 설정 */
    -webkit-overflow-scrolling: none; /* iOS에서 부드러운 스크롤 비활성화 */
}


  body.fixed {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

  input, textarea {
    all: unset; 
    font-family: inherit; 
    font-size: inherit; 
    -webkit-appearance: none; /* 기본 스타일 제거 */
  }
`;

export default GlobalStyle;
