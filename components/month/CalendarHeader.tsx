import useCalendarContext from "./useCalendarContext";
import * as S from "../../styles/month/calendar";

const CalendarHeader = () => {
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <S.HeaderContainer>
      <S.ChangeButton>
        <button onClick={dispatch.handlePrevMonth}>하</button>
        <span>{currentDate.month}</span>
        <button onClick={dispatch.handleNextMonth}>아</button>
      </S.ChangeButton>
    </S.HeaderContainer>
  );
};

export default CalendarHeader;
