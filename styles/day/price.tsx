import { styled } from "styled-components";

export const MainContainer = styled.div<{ setting: string; color: string }>`
  width: 100%;
  height: 45px;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  margin-top: 12px;
  border-radius: 6px;
  padding: 8px;
`;

export const TagContainer = styled.div<{ setting: string; color: string }>`
  width: 30%;
  height: 100%;
  font-weight: 700;
  font-size: 13px;
  background-color: white;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceContainer = styled.div<{ setting: string }>`
  width: calc(70% - 30px);
  height: auto;
  color: white;
  font-size: 16px; /* 기본 글자 크기 */
`;

export const DeleteContainer = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  color: ${({ color }) => color};
  background-color: white;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

export const PriceName = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
`;

export const Price = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;

  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;

  ${({ children }) =>
    typeof children === "string" && children.length > 20
      ? `
      font-size: 12px; /* 글자 크기를 작게 설정 */
    `
      : ""}
`;
