import { styled } from "styled-components";

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

export const MenuContainer = styled.div`
  width: 450px;
  height: 100%;
  z-index: 10;
  background-color: red;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const SubContainer = styled.div`
  width: 100%;
`;

export const TotalMainContainer = styled.div`
  width: 100%;
  height: 113px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TotalMainText = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TotalSubText = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderText = styled.div<{ setting: string }>`
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};

  display: flex;
  align-items: center;
  padding: 4px;
`;

export const TotalText = styled.div<{ setting: string }>`
  width: 100%;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.point : theme.colors.secondary};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TotalSubContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};
  border-radius: 6px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

export const GraphContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 100%;
  background-color: red;
`;

export const SubHeaderText = styled.div<{ setting: string }>`
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 4px;
`;

export const SubTotalText = styled.div<{ setting: string }>`
  width: 100%;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;
