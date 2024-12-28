"use client";
import * as S from "../../styles/day/price";
import { useNumberFormatter } from "../../src/hooks/useNumberFormatter";
interface PriceProps {
  setting: string;
  amount: string | null;
  source: string | null;
  budgetId: string;
  handleDeleteAction: (budgetId: string) => Promise<void>;
}

export default function Price({
  setting,
  amount,
  source,
  budgetId,
  handleDeleteAction,
}: PriceProps) {
  const formattedAmount = useNumberFormatter(amount || 0);

  return (
    <S.MainContainer setting={setting}>
      <S.TagContainer setting={setting}>태그</S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName>{source}</S.PriceName>
        <S.Price>{formattedAmount}</S.Price>
      </S.PriceContainer>
      <S.DeleteContainer
        setting={setting}
        onClick={() => handleDeleteAction(budgetId)}
      >
        {setting === "income" ? "-" : "+"}
      </S.DeleteContainer>
    </S.MainContainer>
  );
}
