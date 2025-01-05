import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
`;

export const ChangeButton = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.mutual};
  font-weight: 700;
  color: white;
`;

export const ButtonContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
`;

export const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightmutual};
  flex-direction: column;
`;

export const DayWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

export const CalendarItem = styled.div<{ $isSunday: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mutual};
  color: white;
  font-weight: 600;
`;

export const Day = styled.div<{
  $isCurrentMonth?: boolean;
  $isSelectedDate: boolean;
  $isSunday: boolean;
  $profit: number;
  $isCurrentDate: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ $isCurrentDate, $profit, theme }) =>
    $isCurrentDate
      ? "#e31263" // Set red color for current date
      : $profit > 0
      ? "#ffffff"
      : $profit < 0
      ? "#ffffff"
      : theme.colors.mutual};
  border: 3px solid
    ${({ $isSelectedDate }) => ($isSelectedDate ? "#270227" : "transparent")};
  background-color: ${({ $profit, theme }) =>
    $profit > 0
      ? theme.colors.income
      : $profit < 0
      ? theme.colors.outcome
      : theme.colors.lightmutual};

  font-weight: 800;
`;

export const PriceContainer = styled.div<{
  $isProfit: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 6px;
  color: white;
`;
