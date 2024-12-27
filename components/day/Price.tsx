"use client";
import * as S from "../../styles/day/price";
interface PriceProps {
  setting: string;
}

export default function Price({ setting }: PriceProps) {
  return (
    <S.MainContainer setting={setting}>
      <S.TagContainer setting={setting}>태그</S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName>지출 내역</S.PriceName>
        <S.Price>13만 23원</S.Price>
      </S.PriceContainer>
    </S.MainContainer>
  );
}
