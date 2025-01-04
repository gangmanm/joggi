import styled from "styled-components";

export const TagContainer = styled.div`
  width: 100%;
  max-height: 60%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 7px;
  display: flex;
  flex-wrap: wrap; /* 가로로 꽉 차면 다음 줄로 이동 */
  padding: 10px;
  display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  overflow-y: scroll;
`;

export const TagBox = styled.div<{ setting: string; selected: boolean }>`
  width: 70px;
  height: 70px;
  margin: 5px 7px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  border: ${({ selected, setting, theme }) =>
    selected
      ? `2px solid ${
          setting === "income" ? theme.colors.income : theme.colors.outcome
        }`
      : "2px solid gray"};

  cursor: pointer;
`;

export const TagText = styled.div<{ tagcolor: string }>`
  display: flex;
  font-weight: 500;
  font-size: 15px;
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
