import { useState, useEffect, useMemo } from "react";
import { Budget } from "../types/budget";
import { createClient } from "../../utils/supabase/client";
import { getBudget } from "../../actions/budget-actions";
import useCalendarContext from "../../components/month/useCalendarContext";

export const useBudgetByTag = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const supabase = createClient();
  const { selectedDate } = useCalendarContext();

  useEffect(() => {
    const fetchBudgets = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user.id) {
        const budgets = await getBudget(data.session.user.id);
        setBudgets(budgets.reverse());
      }
    };

    fetchBudgets();
  }, [supabase]);

  const selectedYear = selectedDate.date.split("-")[0]; // YYYY
  const selectedMonth = selectedDate.date.slice(0, 7); // YYYY-MM
  const selectedDay = selectedDate.date; // YYYY-MM-DD

  const calculateByScope = (scope: "year" | "month" | "day") => {
    const grouped: Record<
      string,
      { income: number; outcome: number; color: string }
    > = {};
    let totalIncome = 0;
    let totalOutcome = 0;

    budgets.forEach((budget) => {
      const date = budget.date || budget.created_at;
      if (!date) return;

      let key = "";

      if (scope === "year" && date.startsWith(selectedYear)) {
        key = budget.tag || "No Tag";
      } else if (scope === "month" && date.startsWith(selectedMonth)) {
        key = budget.tag || "No Tag";
      } else if (scope === "day" && date === selectedDay) {
        key = budget.tag || "No Tag";
      }

      if (!key) return;

      const amount = Number(budget.amount) || 0;
      const isIncome = budget.setting === "income";

      if (!grouped[key]) {
        grouped[key] = {
          income: 0,
          outcome: 0,
          color: budget.color || "#cccccc",
        };
      }

      if (isIncome) {
        grouped[key].income += amount;
        totalIncome += amount;
      } else {
        grouped[key].outcome += amount;
        totalOutcome += amount;
      }
    });

    const result = Object.entries(grouped).map(
      ([tag, { income, outcome, color }]) => ({
        tag,
        income,
        outcome,
        color,
      })
    );

    return { result, totalIncome, totalOutcome };
  };

  const yearlyData = useMemo(
    () => calculateByScope("year"),
    [budgets, selectedYear]
  );
  const monthlyData = useMemo(
    () => calculateByScope("month"),
    [budgets, selectedMonth]
  );
  const dailyData = useMemo(
    () => calculateByScope("day"),
    [budgets, selectedDay]
  );

  const maxIncomeTagByYear = useMemo(() => {
    return yearlyData.result.reduce(
      (acc, item) => (item.income > acc.income ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [yearlyData.result]);

  const maxOutcomeTagByYear = useMemo(() => {
    return yearlyData.result.reduce(
      (acc, item) => (item.outcome > acc.outcome ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [yearlyData.result]);

  const maxIncomeTagByMonth = useMemo(() => {
    return monthlyData.result.reduce(
      (acc, item) => (item.income > acc.income ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [monthlyData.result]);

  const maxOutcomeTagByMonth = useMemo(() => {
    return monthlyData.result.reduce(
      (acc, item) => (item.outcome > acc.outcome ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [monthlyData.result]);

  const maxIncomeTagByDay = useMemo(() => {
    return dailyData.result.reduce(
      (acc, item) => (item.income > acc.income ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [dailyData.result]);

  const maxOutcomeTagByDay = useMemo(() => {
    return dailyData.result.reduce(
      (acc, item) => (item.outcome > acc.outcome ? item : acc),
      { tag: "No Tag", income: 0, outcome: 0 }
    );
  }, [dailyData.result]);

  return {
    yearlyData: yearlyData,
    monthlyData: monthlyData,
    dailyData: dailyData,
    totalByYear: yearlyData.totalIncome - yearlyData.totalOutcome,
    totalByMonth: monthlyData.totalIncome - monthlyData.totalOutcome,
    totalByDay: dailyData.totalIncome - dailyData.totalOutcome,
    maxIncomeTagByYear,
    maxOutcomeTagByYear,
    maxIncomeTagByMonth,
    maxOutcomeTagByMonth,
    maxIncomeTagByDay,
    maxOutcomeTagByDay,
  };
};
