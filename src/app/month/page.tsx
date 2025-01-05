"use client";
import CalendarBody from "../../../components/month/Calendar";
import CalendarHeader from "../../../components/month/CalendarHeader";
import * as S from "../../../styles/month/month";
import useCalendarContext from "../../../components/month/useCalendarContext";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation";
import { useBudgetByTag } from "../../hooks/useBudgetByTag";
import { useState } from "react";

export default function Month() {
  const { selectedDate } = useCalendarContext();

  const [graphSetting, setGraphSetting] = useState("day");

  const router = useRouter();

  const handleRouteToDay = () => {
    router.push("/day");
  };

  const { yearlyData, monthlyData, dailyData } = useBudgetByTag();

  const [year, month, day] = selectedDate.date.split("-");

  return (
    <S.MainContainer>
      <S.HeaderContainer onClick={handleRouteToDay}>
        {year}년 {month}월 {day}일 소비 확인하기 &gt;
      </S.HeaderContainer>
      <Menu />
      <CalendarHeader />
      <CalendarBody />
      <S.DateButtonContainer>
        <S.DateButton
          onClick={() => setGraphSetting("year")}
          isactive={(graphSetting === "year").toString()} // 현재 선택된 상태 여부 전달
        >
          {year}년
        </S.DateButton>
        <S.DateButton
          onClick={() => setGraphSetting("month")}
          isactive={(graphSetting === "month").toString()} // 현재 선택된 상태 여부 전달
        >
          {month}월
        </S.DateButton>
        <S.DateButton
          onClick={() => setGraphSetting("day")}
          isactive={(graphSetting === "day").toString()} // 현재 선택된 상태 여부 전달
        >
          {day}일
        </S.DateButton>
      </S.DateButtonContainer>

      <S.TotalDataContainer setting="income">
        {graphSetting === "year"
          ? `${year}년 총 수입 -  ${yearlyData.totalIncome.toLocaleString()}`
          : graphSetting === "month"
          ? `${year}년 ${month}월 총 수입 -  ${monthlyData.totalIncome.toLocaleString()}`
          : `${year}년 ${month}월 ${day}일 총 수입 -  ${dailyData.totalIncome.toLocaleString()}`}
      </S.TotalDataContainer>
      <S.TagContainer>
        {(graphSetting === "year"
          ? yearlyData.result
          : graphSetting === "month"
          ? monthlyData.result
          : dailyData.result
        )
          .filter((data) => data.income > 0)
          .sort((a, b) => b.income - a.income)
          .slice(0, 4)
          .map((data, index) => (
            <S.TagBox key={index} tagcolor={data.color}>
              <S.TagText>{index + 1}위</S.TagText>
              <S.TagText> {data.tag}</S.TagText>
              <S.TagText
                style={{
                  fontSize:
                    (data.income.toString() ?? "").length > 5 ? "10px" : "12px",
                }}
              >
                {data.income.toLocaleString()}
              </S.TagText>
            </S.TagBox>
          ))}
      </S.TagContainer>

      <S.TotalDataContainer setting="outcome">
        {graphSetting === "year"
          ? `${year}년 총 지출 -  ${yearlyData.totalOutcome.toLocaleString()}`
          : graphSetting === "month"
          ? `${year}년 ${month}월 총 지출 -  ${monthlyData.totalOutcome.toLocaleString()}`
          : `${year}년 ${month}월 ${day}일 총 지출 -  ${dailyData.totalOutcome.toLocaleString()}`}
      </S.TotalDataContainer>
      <S.TagContainer>
        {(graphSetting === "year"
          ? yearlyData.result
          : graphSetting === "month"
          ? monthlyData.result
          : dailyData.result
        )
          .filter((data) => data.outcome > 0) // income이 0보다 큰 항목만 필터링
          .sort((a, b) => b.outcome - a.outcome)
          .slice(0, 4)
          .map((data, index) => (
            <S.TagBox key={index} tagcolor={data.color}>
              <S.TagText>{index + 1}위</S.TagText>
              <S.TagText> {data.tag}</S.TagText>
              <S.TagText
                style={{
                  fontSize:
                    (data.outcome.toString() ?? "").length > 5
                      ? "10px"
                      : "12px",
                }}
              >
                {data.outcome.toLocaleString()}
              </S.TagText>
            </S.TagBox>
          ))}
      </S.TagContainer>
    </S.MainContainer>
  );
}
