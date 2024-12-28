import useCalendarContext from "./useCalendarContext";
import * as S from "../../styles/month/calendar";
import Image from "next/image";
const CalendarHeader = () => {
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <S.HeaderContainer>
      <S.ChangeButton>
        <S.ButtonContainer onClick={dispatch.handlePrevMonth}>
          <Image
            src="/image/left-arrow.png"
            alt="왼쪽"
            fill
            style={{ objectFit: "contain" }}
          />
        </S.ButtonContainer>
        <span>{currentDate.month}</span>
        <S.ButtonContainer onClick={dispatch.handleNextMonth}>
          {" "}
          <Image
            src="/image/right-arrow.png"
            alt="왼쪽"
            fill
            style={{ objectFit: "contain" }}
          />
        </S.ButtonContainer>
      </S.ChangeButton>
    </S.HeaderContainer>
  );
};

export default CalendarHeader;
