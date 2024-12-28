"use client";

import { useEffect, useState } from "react";
import * as S from "../../styles/day/total-price";

interface PriceProps {
  setting: string;
  toggleGeneratePriceAction: () => void;
}

export default function TotalPrice({
  setting,
  toggleGeneratePriceAction,
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
      <S.TotalPriceText setting={setting}>13만 3천원</S.TotalPriceText>
      <S.PriceAddButton
        setting={reverseSetting}
        onClick={toggleGeneratePriceAction}
      >
        {setting === "income" ? "+" : "-"}
      </S.PriceAddButton>
    </S.TotalPriceContainer>
  );
}
