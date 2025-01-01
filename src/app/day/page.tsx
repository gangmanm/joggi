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
  getTag,
} from "../../../actions/budget-actions";
import { createClient } from "../../../utils/supabase/client";
import { Budget, InputValue } from "../../types/budget";
import { useCalculateTotal } from "../../hooks/useCalculateTotal";
import Menu from "../../../components/Menu";
import useCalendarContext from "../../../components/month/useCalendarContext";
import { Database } from "../../../src/types/supabase";

export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

export default function Home() {
  const [setting, setSetting] = useState("income");
  const [session, setSession] = useState<Session | null>(null);
  const [showGeneratePrice, setShowGeneratePrice] = useState(false);
  const [entries, setEntries] = useState<Budget[]>([]);
  const [currentEntry, setCurrentEntry] = useState<InputValue>({
    source: "",
    amount: "",
    tag: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { selectedDate } = useCalendarContext();
  const [tags, setTags] = useState<TagRow[]>([]);
  const { formattedIncomeTotal, formattedOutcomeTotal, formattedTotal } =
    useCalculateTotal(entries);

  const supabase = createClient();

  const fetchTags = async () => {
    try {
      const userId = session?.user.id;
      if (!userId) return;
      const fetchedTags = await getTag(userId);
      setTags(fetchedTags);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
    console.log("selected date", selectedDate);
  };

  const fetchSessionAndBudgets = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      const userId = data.session?.user.id;
      if (userId) {
        const budgets = await getBudget(userId);
        setEntries(budgets.reverse());
      }
    } catch (err) {
      console.error("Failed to fetch session and budgets:", err);
    }
  };

  const handleDelete = async (budgetId: string) => {
    try {
      const success = await deleteBudget(budgetId);
      if (success) {
        setEntries((prev) =>
          prev.filter((budget) => budget.budget_id !== budgetId)
        );
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error("Failed to delete budget:", err);
    }
  };

  const handleInputChange = (
    field: "source" | "amount" | "tag",
    value: string
  ) => {
    setCurrentEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEntryAction = async () => {
    if (
      !currentEntry.source.trim() ||
      !currentEntry.amount.trim() ||
      !currentEntry.tag.trim()
    ) {
      alert("출처, 금액, 태그를 모두 입력해주세요");
      return;
    }

    setShowGeneratePrice(false);

    try {
      const tag = tags.find((tag) => tag.name === currentEntry.tag);
      const newEntry: Omit<Budget, "budget_id"> = {
        source: currentEntry.source,
        amount: currentEntry.amount,
        tag: currentEntry.tag,
        created_at: new Date().toISOString(),
        setting,
        user_id: session?.user.id || "",
        date: selectedDate.date || "",
        color: tag?.color || "",
      };

      setEntries((prev) => [{ ...newEntry, budget_id: "" } as Budget, ...prev]);

      const success = await addBudget(newEntry);
      if (!success) throw new Error("Add budget failed");

      setError(null);
      setCurrentEntry({ source: "", amount: "", tag: "" });

      const budgets = await getBudget(session?.user.id || "");
      setEntries(budgets.reverse());
    } catch (err) {
      setError("Failed to add budget. Please try again.");
      console.error(err);
    }
  };

  const toggleSettingAction = () => {
    setSetting((prev) => (prev === "income" ? "outcome" : "income"));
  };

  const toggleGeneratePriceAction = () => {
    setShowGeneratePrice((prev) => !prev);
  };

  useEffect(() => {
    fetchSessionAndBudgets();
  }, []);

  useEffect(() => {
    fetchTags();
  }, [session?.user.id]);

  if (error) {
    return <S.MainContainer>{error}</S.MainContainer>;
  }

  return (
    <S.MainContainer>
      <Menu />
      <S.SubContainer>
        <TotalPrice
          setting={setting}
          toggleGeneratePriceAction={toggleGeneratePriceAction}
          totalAmount={formattedTotal}
          setSettingAction={setSetting}
        />
        <S.TotalMainContainer>
          <S.TotalSubContainer
            setting="income"
            onClick={toggleSettingAction}
            margin={"0px"}
          >
            <S.TotalSubText>
              <S.SubHeaderText setting={setting}>수입</S.SubHeaderText>
              <S.SubTotalText setting={setting}>
                +{formattedIncomeTotal}
              </S.SubTotalText>
            </S.TotalSubText>
          </S.TotalSubContainer>
          <S.TotalSubContainer
            setting="outcome"
            onClick={toggleSettingAction}
            margin={"10px"}
          >
            <S.TotalSubText>
              <S.SubHeaderText setting={setting}>지출</S.SubHeaderText>
              <S.SubTotalText setting={setting}>
                -{formattedOutcomeTotal}
              </S.SubTotalText>
            </S.TotalSubText>
          </S.TotalSubContainer>
        </S.TotalMainContainer>
      </S.SubContainer>
      <S.PriceContainer>
        {showGeneratePrice && (
          <GeneratePrice
            setting={setting}
            onSourceChangeAction={(value) => handleInputChange("source", value)}
            onAmountChangeAction={(value) => handleInputChange("amount", value)}
            onTagChangeAction={(value) => handleInputChange("tag", value)}
            onAddBudgetAction={handleAddEntryAction}
            userId={session?.user.id || ""}
          />
        )}
        {entries
          .filter(
            (entry) =>
              entry.setting === setting && entry.date === selectedDate.date
          )
          .map((entry) => (
            <Price
              key={entry.budget_id}
              setting={setting}
              source={entry.source}
              amount={entry.amount}
              budgetId={entry.budget_id}
              tag={entry.tag}
              handleDeleteAction={handleDelete}
              color={entry.color || ""}
            />
          ))}
      </S.PriceContainer>
    </S.MainContainer>
  );
}
