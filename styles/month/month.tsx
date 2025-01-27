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

export const HeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.mutual};
  cursor: pointer;
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

export const DateButton = styled.div<{ isactive: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isactive, theme }) =>
    isactive === "true" ? theme.colors.lightmutual : theme.colors.mutual};
  background-color: ${({ isactive, theme }) =>
    isactive === "true" ? theme.colors.mutual : theme.colors.lightmutual};

  border-radius: 5px;
  font-weight: 600;
`;

export const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalDataContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme, setting }) =>
    setting === "income" ? theme.colors.income : theme.colors.outcome};
  color: white;

  border-radius: 5px;

  padding: 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TagContainer = styled.div`
  width: 100%;
  max-height: 90px;
  display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개 */
  align-items: flex-start;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  gap: 10px;
`;

export const TagBox = styled.div<{ tagcolor: string }>`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  background-color: ${({ tagcolor }) => tagcolor};
  cursor: pointer;
  border-radius: 5px;
`;

export const TagText = styled.div`
  display: flex;
  font-weight: 500;
  margin-top: 5px;
  color: white;
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
