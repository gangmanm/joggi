"use client";

import { useEffect, useState } from "react";
import * as S from "../../styles/day/total-price";

interface PriceProps {
  setting: string;
  toggleGeneratePrice: () => void; // 부모에서 전달받은 함수
}

export default function TotalPrice({
  setting,
  toggleGeneratePrice,
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
      <S.PriceAddButton setting={setting} onClick={toggleGeneratePrice}>
        {setting === "income" ? "+" : "-"}
      </S.PriceAddButton>
      <S.TotalPriceText setting={setting}>13만 3천원</S.TotalPriceText>
      <S.PriceAddButton setting={reverseSetting} onClick={toggleGeneratePrice}>
        {setting === "income" ? "-" : "+"}
      </S.PriceAddButton>
    </S.TotalPriceContainer>
  );
}
