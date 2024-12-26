"use client"; // 클라이언트 컴포넌트로 선언

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* 박스 크기 계산 방식 설정 */
  }

  html, body {
    width: 100vw;
    height: 100vh;
    font-family: "Pretendard", Arial, Helvetica, sans-serif;
    overflow: hidden; /* 가로/세로 스크롤 방지 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (min-device-pixel-ratio: 2) {
  svg {
    shape-rendering: crispEdges;
  }
}
`;

export default GlobalStyle;
