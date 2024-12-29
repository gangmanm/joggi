"use client";
import CalendarBody from "../../../components/month/Calendar";
import CalendarHeader from "../../../components/month/CalendarHeader";
import * as S from "../../../styles/month/month";
import useCalendarContext from "../../../components/month/useCalendarContext";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation";
import { useBudgetByTag } from "../../hooks/useBudgetByTag";
export default function Month() {
  const { selectedDate } = useCalendarContext();
  const router = useRouter(); // useRouter 대신 next/navigation의 useRouter 사용
  const {
    maxIncomeTagByYear,
    maxOutcomeTagByYear,
    maxIncomeTagByMonth,
    maxOutcomeTagByMonth,
    maxIncomeTagByDay,
    maxOutcomeTagByDay,
  } = useBudgetByTag();

  const handleRouteToDay = () => {
    router.push("/day"); // "/month"로 라우팅
  };
  // selectedDate를 나눠서 년, 월, 일 추출
  const [year, month, day] = selectedDate.date.split("-");

  return (
    <S.MainContainer>
      <Menu />
      <S.InformationContainer>
        <S.PriceInformContainer $isLeft={false}>
          <>
            {maxIncomeTagByYear.tag !== "No Tag" &&
              maxIncomeTagByYear.income > 0 && (
                <>
                  주로 {maxIncomeTagByYear.tag}를 통해{" "}
                  {maxIncomeTagByYear.income.toLocaleString()}원을 벌었네요{" "}
                </>
              )}
            {maxOutcomeTagByYear.tag !== "No Tag" &&
              maxOutcomeTagByYear.outcome > 0 && (
                <>
                  주로 {maxOutcomeTagByYear.tag}에{" "}
                  {maxOutcomeTagByYear.outcome.toLocaleString()}원을 썼네요
                </>
              )}
          </>
        </S.PriceInformContainer>
        <S.DateContainer>
          <S.DateText>{year}년</S.DateText>
          <S.SubText>당신은</S.SubText>
        </S.DateContainer>
      </S.InformationContainer>
      <S.InformationContainer>
        <S.DateContainer>
          {" "}
          <S.DateText>{month}월</S.DateText>
          <S.SubText>당신은</S.SubText>
        </S.DateContainer>
        <S.PriceInformContainer $isLeft={true}>
          <>
            {maxIncomeTagByMonth.tag !== "No Tag" &&
              maxIncomeTagByMonth.income > 0 && (
                <>
                  주로 {maxIncomeTagByMonth.tag}를 통해{" "}
                  {maxIncomeTagByMonth.income.toLocaleString()}원을 벌었네요{" "}
                </>
              )}
            {maxOutcomeTagByMonth.tag !== "No Tag" &&
              maxOutcomeTagByMonth.outcome > 0 && (
                <>
                  주로 {maxOutcomeTagByMonth.tag}에{" "}
                  {maxOutcomeTagByMonth.outcome.toLocaleString()}원을 썼네요
                </>
              )}
          </>
        </S.PriceInformContainer>
      </S.InformationContainer>

      {/* 캘린더 헤더 및 본문 */}
      <CalendarHeader />
      <CalendarBody />

      {/* 선택된 날짜 정보 */}
      <S.InformationContainer>
        <S.PriceInformContainer $isLeft={false}>
          <>
            {maxIncomeTagByDay.tag !== "No Tag" &&
              maxIncomeTagByDay.income > 0 && (
                <>
                  주로 {maxIncomeTagByDay.tag}를 통해{" "}
                  {maxIncomeTagByDay.income.toLocaleString()}원을 벌었네요{" "}
                </>
              )}
            {maxOutcomeTagByDay.tag !== "No Tag" &&
              maxOutcomeTagByDay.outcome > 0 && (
                <>
                  주로 {maxOutcomeTagByDay.tag}에{" "}
                  {maxOutcomeTagByDay.outcome.toLocaleString()}원을 썼네요
                </>
              )}
          </>
        </S.PriceInformContainer>
        <S.DateContainer onClick={handleRouteToDay}>
          <S.DateText>{day}일</S.DateText>
          <S.SubText>당신은</S.SubText>
        </S.DateContainer>
      </S.InformationContainer>
      <S.MarginBottom></S.MarginBottom>
    </S.MainContainer>
  );
}
