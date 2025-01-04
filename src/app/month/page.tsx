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

export default function Month() {
  const { selectedDate } = useCalendarContext();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]); // 필터링된 데이터
  const { session } = useSessionContext();
  const [graphSetting, setGraphSetting] = useState("year");

  const router = useRouter();
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

  // 날짜 기반 필터링 로직
  const [year, month, day] = selectedDate.date.split("-");
  useEffect(() => {
    const filtered = budgets.filter((budget) => {
      if (!budget.date) return false; // date가 null 또는 undefined인 항목은 제외

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
      <Menu />
      {/* 캘린더 헤더 및 본문 */}
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
      <S.ChartContainer>
        <DoughnutChart data={filteredBudgets} />
      </S.ChartContainer>
      <div>{yearlyData.totalIncome}</div>
      <S.MarginBottom></S.MarginBottom>
    </S.MainContainer>
  );
}
