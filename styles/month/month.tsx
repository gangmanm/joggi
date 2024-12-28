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

export const PriceInformContainer = styled.div`
  width: calc(100% - 125px);
  height: 125px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  margin-left: 6px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 10px;
  color: #787878;
  font-weight: 700;
`;
