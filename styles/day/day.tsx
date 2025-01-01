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

export const TotalSubContainer = styled.div<{
  setting: string;
  margin: string;
}>`
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

  /* margin-left 동적 설정 */
  margin-left: ${({ margin }) => margin};
`;

export const GraphContainer = styled.div<{ setting: string }>`
  width: 100%;
  height: 100%;
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
  height: auto; /* 높이를 텍스트 내용에 맞게 자동 조정 */
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  /* 줄바꿈 처리 */
  white-space: normal; /* 줄바꿈 허용 */
  word-break: break-word; /* 긴 단어가 있을 경우 줄바꿈 처리 */
  text-align: center; /* 텍스트 가운데 정렬 */
  padding: 10px; /* 내부 여백 추가 */

  /* 최대 너비 제한 (필요한 경우 추가) */
  max-width: 100%; /* 컨테이너 너비를 초과하지 않도록 제한 */
  overflow-wrap: break-word; /* 텍스트가 넘칠 경우 줄바꿈 */
`;

export const PriceContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;
