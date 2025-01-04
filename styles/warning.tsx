import { styled } from "styled-components";

export const WarningContainer = styled.div`
  width: 300px;
  border-radius: 8px; /* 모서리 둥글게 */
  background-color: #ceb2d0; /* 배경색 */
  position: fixed;
  top: 50%; /* 세로 중앙 정렬 */
  left: 50%; /* 가로 중앙 정렬 */
  transform: translate(-50%, -50%); /* 정확히 중앙에 배치 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 내부 콘텐츠 세로 정렬 */
  justify-content: space-evenly; /* 내부 콘텐츠 가로 정렬 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  border: 2px solid ${({ theme }) => theme.colors.mutual};
  padding: 20px;
`;

export const WarningText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mutual};
`;
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.mutual};
  color: white;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;
