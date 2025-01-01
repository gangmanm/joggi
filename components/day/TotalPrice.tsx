"use client";
import * as S from "../../styles/day/total-price";

interface PriceProps {
  setting: string;
  toggleGeneratePriceAction: () => void;
  totalAmount: string;
}

export default function TotalPrice({
  setting,
  toggleGeneratePriceAction,
  totalAmount,
}: PriceProps) {
  return (
    <S.TotalPriceMain>
      <S.PriceAddButton setting={"income"} onClick={toggleGeneratePriceAction}>
        +
      </S.PriceAddButton>
      <S.TotalPriceContainer setting={setting}>
        <S.TotalPriceText setting={setting}>
          {parseInt(totalAmount) > 0
            ? `+${totalAmount}`
            : parseInt(totalAmount) < 0
            ? `${totalAmount}`
            : totalAmount}
        </S.TotalPriceText>
      </S.TotalPriceContainer>
      <S.PriceAddButton setting={"outcome"} onClick={toggleGeneratePriceAction}>
        -
      </S.PriceAddButton>
    </S.TotalPriceMain>
  );
}
