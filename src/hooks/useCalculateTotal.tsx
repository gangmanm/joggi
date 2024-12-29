import { useMemo } from "react";
import { Budget } from "../types/budget";
import { useNumberFormatter } from "./useNumberFormatter";
import useCalendarContext from "../../components/month/useCalendarContext";

export const useCalculateTotal = (budgets: Budget[] | null) => {
  const { selectedDate } = useCalendarContext();

  const { incomeTotal, outcomeTotal, total } = useMemo(() => {
    let incomeTotal = 0;
    let outcomeTotal = 0;

    // selectedDate 기준으로 필터링
    const filteredBudgets = (budgets || []).filter(
      (budget) => budget.date === selectedDate.date
    );

    filteredBudgets.forEach((budget) => {
      const amount = Number(budget.amount) || 0;

      if (budget.setting === "income") {
        incomeTotal += amount;
      } else if (budget.setting === "outcome") {
        outcomeTotal += amount;
      }
    });

    const total = incomeTotal - outcomeTotal;

    return { incomeTotal, outcomeTotal, total };
  }, [budgets, selectedDate]);

  const formattedIncomeTotal = useNumberFormatter(incomeTotal);
  const formattedOutcomeTotal = useNumberFormatter(outcomeTotal);
  const formattedTotal = useNumberFormatter(total);

  return { formattedIncomeTotal, formattedOutcomeTotal, formattedTotal };
};
