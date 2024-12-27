"use client";

import { useEffect, useState } from "react";
import * as S from "../../styles/day/total-price";

interface PriceProps {
  setting: string;
}

export default function TotalPrice({ setting }: PriceProps) {
  const [reverseSetting, setReverseSetting] = useState("income");

  useEffect(() => {
    // setting 값이 변경될 때 reverseSetting을 업데이트
    if (setting === "income") {
      setReverseSetting("outcome");
    } else {
      setReverseSetting("income");
    }
  }, [setting]); // setting 변경 시에만 실행

  return (
    <S.TotalPriceContainer setting={setting}>
      <S.PriceAddButton setting={setting}>
        {setting === "income" ? "+" : "-"}
      </S.PriceAddButton>
      <S.TotalPriceText setting={setting}>13만 3천원</S.TotalPriceText>
      <S.PriceAddButton setting={reverseSetting}>
        {setting === "income" ? "-" : "+"}
      </S.PriceAddButton>
    </S.TotalPriceContainer>
  );
}
