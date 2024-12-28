import { useMemo } from "react";
import { Budget } from "../types/budget";
import { useNumberFormatter } from "./useNumberFormatter";
export const useCalculateTotal = (budgets: Budget[] | null) => {
  const { incomeTotal, outcomeTotal, total } = useMemo(() => {
    let incomeTotal = 0;
    let outcomeTotal = 0;

    (budgets || []).forEach((budget) => {
      const amount = Number(budget.amount) || 0;

      if (budget.setting === "income") {
        incomeTotal += amount;
      } else if (budget.setting === "outcome") {
        outcomeTotal += amount;
      }
    });

    const total = incomeTotal - outcomeTotal;

    return { incomeTotal, outcomeTotal, total };
  }, [budgets]);

  const formattedIncomeTotal = useNumberFormatter(incomeTotal);
  const formattedOutcomeTotal = useNumberFormatter(outcomeTotal);
  const formattedTotal = useNumberFormatter(total);

  return { formattedIncomeTotal, formattedOutcomeTotal, formattedTotal };
};
