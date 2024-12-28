import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChangeButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  font-size: 20px;
  line-height: 25.6px;
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  padding: 25px 0;
  border-radius: 20px;
`;

export const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
  grid-row-gap: 15px;
`;
export const CalendarItem = styled.div<{ $isSunday: boolean }>`
  display: flex;
  justify-content: center;
  color: ${({ theme, $isSunday }) =>
    $isSunday ? theme.colors.error : theme.colors["accent-content"]};
`;

export const Day = styled.div<{
  $isCurrentMonth?: boolean;
  $isSelectedDate: boolean;
  $isSunday: boolean;
}>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme, $isCurrentMonth, $isSelectedDate, $isSunday }) =>
    $isSelectedDate
      ? theme.colors["base-100"]
      : !$isCurrentMonth
      ? theme.colors["neutral-content"]
      : $isSunday
      ? theme.colors.error
      : theme.colors["secondary-content"]};
  background-color: ${({ $isSelectedDate, theme }) =>
    $isSelectedDate ? theme.colors.primary : "transparent"};
`;
