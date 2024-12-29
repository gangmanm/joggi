import styled from "styled-components";

export const TotalPriceMain = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
export const TotalPriceContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(to left, ${theme.colors.outcome}, ${theme.colors.income})`};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const TotalPriceText = styled.div<{ setting: string }>`
  width: 100%;
  font-size: 18px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceAddButton = styled.div<{ setting: string }>`
  width: 45px;
  height: 45px;
  font-size: 18px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};

  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
