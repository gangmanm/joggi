"use client";
import * as S from "../../styles/day/price";
interface PriceProps {
  setting: string;
  amount: string | null;
  source: string | null;
}

export default function Price({ setting, amount, source }: PriceProps) {
  return (
    <S.MainContainer setting={setting}>
      <S.TagContainer setting={setting}>태그</S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName>{source}</S.PriceName>
        <S.Price>{amount}</S.Price>
      </S.PriceContainer>
      <S.DeleteContainer setting={setting}>
        {setting === "income" ? "-" : "+"}
      </S.DeleteContainer>
    </S.MainContainer>
  );
}
