"use client";
import CalendarBody from "../../../components/month/Calendar";
import CalendarHeader from "../../../components/month/CalendarHeader";
import * as S from "../../../styles/month/month";
import useCalendarContext from "../../../components/month/useCalendarContext";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation";
export default function Month() {
  const { selectedDate } = useCalendarContext();
  const router = useRouter(); // useRouter 대신 next/navigation의 useRouter 사용

  const handleRouteToDay = () => {
    router.push("/day"); // "/month"로 라우팅
  };
  // selectedDate를 나눠서 년, 월, 일 추출
  const [year, month, day] = selectedDate.date.split("-");

  return (
    <S.MainContainer>
      <Menu />
      <S.InformationContainer>
        <S.PriceInformContainer></S.PriceInformContainer>
        <S.DateContainer>{year}</S.DateContainer>
      </S.InformationContainer>
      {/* 상단 정보 섹션 */}
      <S.InformationContainer>
        <S.DateContainer>{month}</S.DateContainer>
        <S.PriceInformContainer></S.PriceInformContainer>
      </S.InformationContainer>

      {/* 캘린더 헤더 및 본문 */}
      <CalendarHeader />
      <CalendarBody />

      {/* 선택된 날짜 정보 */}
      <S.InformationContainer>
        <S.DateContainer onClick={handleRouteToDay}>{day}</S.DateContainer>
        <S.PriceInformContainer></S.PriceInformContainer>
      </S.InformationContainer>
    </S.MainContainer>
  );
}
