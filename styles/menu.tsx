import { styled } from "styled-components";

export const MenuContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px; /* 원형으로 만듭니다 */
  background-color: ${({ theme }) =>
    theme.colors.mutual}; /* 배경색을 지정 (필요에 따라 변경) */
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  cursor: pointer; /* 클릭 가능 표시 */
`;

export const MenuImageContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Image에서 position 절대값 활용 */
`;

export const SubMenuImageContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Image에서 position 절대값 활용 */
  margin-bottom: 10px;
  cursor: pointer; /* 클릭 가능 표시 */
`;

export const MenuOpen = styled.div`
  width: 50px; /* 네모박스의 너비 */
  height: 150px; /* 네모박스의 높이 */
  background-color: ${({ theme }) =>
    theme.colors.mutual}; /* 배경색을 지정 (필요에 따라 변경) */
  position: fixed;
  bottom: 75px;
  right: 30px;
  border-radius: 8px 8px 0px 0px; /* 모서리 둥글게 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;
