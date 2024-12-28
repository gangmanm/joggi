import * as S from "../../styles/month/calendar";
import useCalendarContext from "./useCalendarContext";

const CalendarBody = () => {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();

  return (
    <S.MonthContainer>
      <S.DayWrapper>
        {weeks.map((week, index) => (
          <S.CalendarItem $isSunday={index === 0} key={week}>
            {week}
          </S.CalendarItem>
        ))}
      </S.DayWrapper>
      <S.DayWrapper>
        {daysInMonth.map((date) => (
          <S.Day
            onClick={() => selectedDate.selectDate(date.date)}
            $isCurrentMonth={currentDate.month === date.month}
            $isSelectedDate={selectedDate.date === date.date}
            $isSunday={date.dayIndexOfWeek === 0}
            className={date.month}
            key={date.date}
          >
            <span>{date.day}</span>
          </S.Day>
        ))}
      </S.DayWrapper>
    </S.MonthContainer>
  );
};

export default CalendarBody;
