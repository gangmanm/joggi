"use client";
import * as S from "../../styles/day/price";
import { useNumberFormatter } from "../../src/hooks/useNumberFormatter";
export type TagRow = Database["public"]["Tables"]["tag"]["Row"];
import { Database } from "../../src/types/supabase";

interface PriceProps {
  tag: string | null;
  setting: string;
  amount: string | null;
  source: string | null;
  budgetId: string;
  handleDeleteAction: (budgetId: string) => Promise<void>;
  color: string;
}

export default function Price({
  tag,
  setting,
  amount,
  source,
  budgetId,
  handleDeleteAction,
  color,
}: PriceProps) {
  const formattedAmount = useNumberFormatter(amount || 0);

  return (
    <S.MainContainer setting={setting} color={color}>
      <S.TagContainer setting={setting} color={color}>
        {tag}
      </S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName>{source}</S.PriceName>
        <S.Price>{formattedAmount}</S.Price>
      </S.PriceContainer>
      <S.DeleteContainer
        color={color}
        onClick={() => handleDeleteAction(budgetId)}
      >
        {setting === "income" ? "-" : "+"}
      </S.DeleteContainer>
    </S.MainContainer>
  );
}
