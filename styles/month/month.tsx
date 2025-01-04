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

export const InformationContainer = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

export const DateContainer = styled.div`
  width: 150px;
  height: 125px;
  background-color: ${({ theme }) => theme.colors.point};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DateText = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

export const SubText = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 26px;
  display: flex;
  justify-content: center;
`;

export const MarginBottom = styled.div`
  width: 100%;
  height: 100px;
`;

export const PriceInformContainer = styled.div<{
  $isLeft: boolean;
}>`
  width: calc(100% - 125px);
  height: 125px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  color: #787878;
  font-weight: 700;
  margin-left: ${({ $isLeft }) => ($isLeft ? "8px" : "0px")};
  margin-right: ${({ $isLeft }) => ($isLeft ? "0px" : "8px")};
`;

export const IncomeInformation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.point};
`;
export const OutcomeInformation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.point};
`;

export const TotalInformation = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const DateButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

export const DateButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${({ theme }) => theme.colors.mutual};
  border-radius: 5px;
`;

export const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
