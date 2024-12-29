import styled from "styled-components";

export const TagContainer = styled.div`
  width: 100%;
  height: 50%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 7px;
  display: flex;
  padding: 10px;
`;

export const TagBox = styled.div<{ setting: string }>`
  width: 70px;
  height: 70px;
  margin-left: 7px;
  margin-right: 7px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;
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
