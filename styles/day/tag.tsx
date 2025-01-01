import styled from "styled-components";

export const TagContainer = styled.div`
  width: 100%;
  height: 60%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 7px;
  display: flex;
  padding: 10px;
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
