import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 450px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
`;

export const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
`;
export const TotalMainContainer = styled.div`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
  padding: 7px;

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

export const HeaderText = styled.div`
  width: 100%;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.point};

  display: flex;
  align-items: center;
  padding: 4px;
`;

export const TotalText = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.point};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TotalSubContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  padding: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TotalSubText = styled.div``;
