"use client";

import { useEffect, useState } from "react";
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
  const [reverseSetting, setReverseSetting] = useState("income");

  useEffect(() => {
    if (setting === "income") {
      setReverseSetting("outcome");
    } else {
      setReverseSetting("income");
    }
  }, [setting]);

  return (
    <S.TotalPriceContainer setting={setting}>
      <S.TotalPriceText setting={setting}>
        {parseInt(totalAmount) > 0 ? "+" : "-"} {totalAmount}
      </S.TotalPriceText>
      <S.PriceAddButton
        setting={reverseSetting}
        onClick={toggleGeneratePriceAction}
      >
        {setting === "income" ? "+" : "-"}
      </S.PriceAddButton>
    </S.TotalPriceContainer>
  );
}
