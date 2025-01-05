"use client";
import CalendarBody from "../../../components/month/Calendar";
import CalendarHeader from "../../../components/month/CalendarHeader";
import * as S from "../../../styles/month/month";
import useCalendarContext from "../../../components/month/useCalendarContext";
import Menu from "../../../components/Menu";
import { useRouter } from "next/navigation";
import { useBudgetByTag } from "../../hooks/useBudgetByTag";
import DoughnutChart from "../../../components/Chart";
import { Budget } from "../../types/budget";
import { useSessionContext } from "../context/SessionContext";
import { useState, useEffect } from "react";
import { getBudget } from "../../../actions/budget-actions";
import * as T from "../../../styles/tag/tag";

export default function Month() {
  const { selectedDate } = useCalendarContext();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]); // 필터링된 데이터
  const { session } = useSessionContext();
  const [graphSetting, setGraphSetting] = useState("day");

  const router = useRouter();

  const handleRouteToDay = () => {
    router.push("/day");
  };

  const { yearlyData, monthlyData, dailyData } = useBudgetByTag();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgets = await getBudget(session?.user.id || "");
        setBudgets(budgets.reverse());
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      }
    };

    fetchBudgets();
  }, [session]);

  const [year, month, day] = selectedDate.date.split("-");
  useEffect(() => {
    const filtered = budgets.filter((budget) => {
      if (!budget.date) return false;

      const budgetDate = new Date(budget.date);
      const selectedYear = parseInt(year, 10);
      const selectedMonth = parseInt(month, 10) - 1; // 월은 0부터 시작
      const selectedDay = parseInt(day, 10);

      if (graphSetting === "year") {
        return budgetDate.getFullYear() === selectedYear;
      } else if (graphSetting === "month") {
        return (
          budgetDate.getFullYear() === selectedYear &&
          budgetDate.getMonth() === selectedMonth
        );
      } else if (graphSetting === "day") {
        return (
          budgetDate.getFullYear() === selectedYear &&
          budgetDate.getMonth() === selectedMonth &&
          budgetDate.getDate() === selectedDay
        );
      }
      return true;
    });

    setFilteredBudgets(filtered);
  }, [budgets, year, month, day, graphSetting]);

  return (
    <S.MainContainer>
      <S.HeaderContainer onClick={handleRouteToDay}>
        {year}년 {month}월 {day}일 소비 확인하기 &gt;
      </S.HeaderContainer>
      <Menu />
      <CalendarHeader />
      <CalendarBody />
      <S.DateButtonContainer>
        <S.DateButton onClick={() => setGraphSetting("year")}>
          {year}년
        </S.DateButton>
        <S.DateButton onClick={() => setGraphSetting("month")}>
          {month}월
        </S.DateButton>
        <S.DateButton onClick={() => setGraphSetting("day")}>
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
          .filter((data) => data.income > 0) // income이 0보다 큰 항목만 필터링
          .sort((a, b) => b.income - a.income)
          .slice(0, 4) // income 기준 내림차순 정렬
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
