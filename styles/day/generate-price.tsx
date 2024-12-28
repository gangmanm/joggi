import { styled } from "styled-components";

export const MainContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 45px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};
  display: flex;
  align-items: center;
  margin-top: 12px;
  border-radius: 6px;
  padding: 8px;
`;

export const TagContainer = styled.div<{ setting: string }>`
  width: 30%;
  height: 100%;
  font-weight: 700;
  font-size: 13px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};

  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceContainer = styled.div<{ setting: string }>`
  width: 70%;
  height: 100%;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};
`;

export const PriceName = styled.input<{ setting: string }>`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: center;
  &::placeholder {
    color: ${({ theme, setting }) =>
      setting === "income"
        ? theme.colors.primary
        : theme.colors.secondary}; /* placeholder 텍스트 색상 */
    font-weight: 400;
  }
`;

export const Price = styled.input<{ setting: string }>`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  text-align: center; 
  padding: 0; 
  border: none; 
  outline: none; 

  &::placeholder {
    color: ${({ theme, setting }) =>
      setting === "income"
        ? theme.colors.primary
        : theme.colors.secondary};
    font-weight: 400;
  }
`;
