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
  width: 100%;
  margin-bottom: 10px;
  border-radius: 7px;
  display: flex;
  flex-wrap: wrap; /* 가로로 꽉 차면 다음 줄로 이동 */
  gap: 5px; /* 요소 간 간격 설정 */
  align-items: flex-start; /* 세로 방향 간격 최소화 */
`;

export const TagBox = styled.div`
  width: 70px;
  height: 70px;
  margin: 5px 7px;
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
