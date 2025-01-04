import styled from "styled-components";

export const MainContainer = styled.div`
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  z-index: 20;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
`;

export const Header = styled.div<{ setting: string }>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};
  padding: 10px;
  display: flex;
  align-items: center;
  color: white;
`;

export const TagGenerate = styled.div<{ setting: string }>`
  width: 95%;
  height: 200px;
  border: 2px solid
    ${({ theme, setting }) =>
      setting === "income" ? theme.colors.income : theme.colors.outcome};

  margin: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const TagGenerateBox = styled.div<{ setting: string }>`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const TagColorBox = styled.div<{ setting: string }>`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const TagGenerateColor = styled.div<{ tagcolor: string }>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${({ tagcolor }) => tagcolor};
`;

export const TagGenerateInput = styled.input<{ tagcolor: string }>`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;

  color: ${({ tagcolor }) => tagcolor};
  &::placeholder {
    color: ${({ tagcolor }) => tagcolor};
  }
`;

export const TagContainer = styled.div`
  width: 90%;
  max-height: 60%;
  border-radius: 7px;
  display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  align-items: flex-start;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  gap: 10px;
`;

export const TagBox = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  border: 2px solid gray;

  cursor: pointer;
`;

export const TagText = styled.div<{ tagcolor: string }>`
  display: flex;
  font-weight: 500;
  margin-top: 5px;
  color: ${({ tagcolor }) => tagcolor};
`;

export const TagButton = styled.div<{ setting: string }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

export const TagColor = styled.div<{ tagcolor: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ tagcolor }) => tagcolor};
`;

export const TagMenu = styled.div<{ tagcolor: string }>`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ tagcolor }) => tagcolor};
`;
export const TagAddButton = styled.div<{ setting: string }>`
  width: 100%;
  height: 30px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 5px;
`;

export const TagMenuContainer = styled.div`
  width: 70px;
  height: 60px;
  background-color: #ceb2d0;
  display: flex;
  flex-direction: column;
`;

export const TagMenuText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: transparent; /* 기본 배경색 */
  transition: background-color 0.3s; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #9658d7; /* hover 시 배경색 */
  }
`;
