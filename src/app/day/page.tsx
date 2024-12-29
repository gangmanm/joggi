"use client";
import { useState, useEffect } from "react";
import * as S from "../../../styles/day/day";
import { Session } from "@supabase/supabase-js";
import TotalPrice from "../../../components/day/TotalPrice";
import GeneratePrice from "../../../components/day/GeneratePrice";
import Price from "../../../components/day/Price";
import {
  addBudget,
  getBudget,
  deleteBudget,
} from "../../../actions/budget-actions";
import { createClient } from "../../../utils/supabase/client";
import { Budget, InputValue } from "../../types/budget";
import { useCalculateTotal } from "../../hooks/useCalculateTotal";
import Menu from "../../../components/Menu";
import useCalendarContext from "../../../components/month/useCalendarContext";

export default function Home() {
  const [setting, setSetting] = useState("income");
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [showGeneratePrice, setShowGeneratePrice] = useState(false);
  const [entries, setEntries] = useState<Budget[]>([]);
  const [currentEntry, setCurrentEntry] = useState<InputValue>({
    source: "",
    amount: "",
    tag: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { selectedDate } = useCalendarContext();
  const { formattedIncomeTotal, formattedOutcomeTotal, formattedTotal } =
    useCalculateTotal(entries);

  const supabase = createClient();
  const [year, month, day] = selectedDate.date.split("-");

  const handleDelete = async (budgetId: string) => {
    const success = await deleteBudget(budgetId);

    if (success) {
      setEntries((prev) =>
        prev.filter((budget) => budget.budget_id !== budgetId)
      );
    } else {
      console.error("Failed to delete budget.");
    }
  };

  const handleInputChange = (
    field: "source" | "amount" | "tag",
    value: string
  ) => {
    setCurrentEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEntryAction = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (
        !currentEntry.source.trim() ||
        !currentEntry.amount.trim() ||
        !currentEntry.tag.trim()
      ) {
        alert("출처, 금액, 태그를 모두 입력해주세요");
        return;
      }

      setShowGeneratePrice(false);

      const newEntry: Omit<Budget, "budget_id"> = {
        source: currentEntry.source,
        amount: currentEntry.amount,
        tag: currentEntry.tag,
        created_at: new Date().toISOString(),
        setting,
        user_id: session?.user.id || "",
        date: selectedDate.date || "",
      };

      setEntries((prevEntries) => [
        {
          ...newEntry,
          budget_id: "",
        } as Budget,
        ...prevEntries,
      ]);

      const success = await addBudget(newEntry);

      if (!success) {
        setError("Failed to add budget. Please try again.");
        return;
      } else {
        setError(null);
      }

      setCurrentEntry({ source: "", amount: "", tag: "" });

      const budgets = await getBudget(session?.user.id || "");
      setEntries(budgets.reverse());
    }
  };

  const toggleSettingAction = () => {
    setSetting((prev) => (prev === "income" ? "outcome" : "income"));
  };

  const toggleGeneratePriceAction = () => {
    setShowGeneratePrice((prev) => !prev);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchSessionAndBudgets = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(data.session);
        if (data.session?.user.id) {
          const budgets = await getBudget(data.session.user.id);
          setEntries(budgets.reverse());
        }
      }
    };

    fetchSessionAndBudgets();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  if (error) {
    return <S.MainContainer>{error}</S.MainContainer>;
  }

  // selectedDate와 일치하는 항목 필터링
  const filteredEntries = entries.filter(
    (entry) => entry.date === selectedDate.date
  );

  return (
    <S.MainContainer>
      <Menu />

      <S.SubContainer>
        <S.TotalMainContainer setting={setting}>
          <S.TotalMainText>
            <S.HeaderText setting={setting}>
              {year}년 {month}월 {day}일의{" "}
              {setting === "income" ? "수입" : "지출"}
            </S.HeaderText>
            <S.TotalText setting={setting}>
              {setting === "income"
                ? formattedIncomeTotal
                : formattedOutcomeTotal}
            </S.TotalText>
          </S.TotalMainText>
          <S.TotalSubContainer setting={setting} onClick={toggleSettingAction}>
            <S.TotalSubText>
              <S.SubHeaderText setting={setting}>
                {year}년 {month}월 {day}일의{" "}
                {setting === "income" ? "지출" : "수입"}
              </S.SubHeaderText>
              <S.SubTotalText setting={setting}>
                {setting === "income"
                  ? formattedOutcomeTotal
                  : formattedIncomeTotal}
              </S.SubTotalText>
            </S.TotalSubText>
          </S.TotalSubContainer>
        </S.TotalMainContainer>
      </S.SubContainer>
      <S.PriceContainer>
        <TotalPrice
          setting={setting}
          toggleGeneratePriceAction={toggleGeneratePriceAction}
          totalAmount={formattedTotal}
        />
        {showGeneratePrice && (
          <GeneratePrice
            setting={setting}
            onSourceChangeAction={(value) => handleInputChange("source", value)}
            onAmountChangeAction={(value) => handleInputChange("amount", value)}
            onTagChangeAction={(value) => handleInputChange("tag", value)}
            onKeyDownAction={handleAddEntryAction}
            userId={session?.user.id || " "}
          />
        )}
        {filteredEntries
          .filter((entry) => entry.setting === setting)
          .map((entry, index) => (
            <Price
              key={index}
              setting={setting}
              source={entry.source}
              amount={entry.amount}
              budgetId={entry.budget_id}
              tag={entry.tag}
              handleDeleteAction={handleDelete}
            />
          ))}
      </S.PriceContainer>
    </S.MainContainer>
  );
}
