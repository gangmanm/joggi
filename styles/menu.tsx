import { styled } from "styled-components";

export const Menu = styled.div`
  width: 450px;
  height: 100%;
  position: fixed;
`;
export const MenuContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* 원형으로 만듭니다 */
  background-color: #ff9a2f; /* 배경색을 지정 (필요에 따라 변경) */
  position: relative;
  top: 90%;
  left: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  cursor: pointer; /* 클릭 가능 표시 */
  z-index: 20; /* MenuContainer가 위에 오도록 설정 */
`;

export const MenuOpen = styled.div`
  width: 50px; /* 네모박스의 너비 */
  height: 100px; /* 네모박스의 높이 */
  background-color: #ff9a2f; /* 네모박스의 배경색 */
  position: relative;
  top: calc(90% - 125px);
  left: 80%;
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* MenuContainer보다 뒤에 배치 */
`;
