import styled from "styled-components";

export const TotalPriceContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 45px;
  background: ${({ theme, setting }) =>
    setting === "income"
      ? `linear-gradient(to left, ${theme.colors.point}, ${theme.colors.secondary})`
      : `linear-gradient(to right, ${theme.colors.point}, ${theme.colors.secondary})`};
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const TotalPriceText = styled.div<{ setting: string }>`
  width: 100%;
  font-size: 18px;
  font-weight: 800;
  color: ${({ setting }) => (setting === "income" ? "#414141" : "#910202")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceAddButton = styled.div<{ setting: string }>`
  width: 30px;
  height: 30px;
  font-size: 18px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};

  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.secondary : theme.colors.point};
`;
