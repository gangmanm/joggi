"use client";
import * as S from "../../styles/day/generate-price";

interface PriceProps {
  setting: string;
  onSourceChangeAction: (value: string) => void;
  onAmountChangeAction: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Enter 이벤트 Prop 추가
}

export default function GeneratePrice({
  setting,
  onSourceChangeAction,
  onAmountChangeAction,
  onKeyDown,
}: PriceProps) {
  return (
    <S.MainContainer setting={setting}>
      <S.TagContainer setting={setting}>태그</S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName
          placeholder="자세한 수입 출처"
          onChange={(e) => onSourceChangeAction(e.target.value)}
          onKeyDown={onKeyDown} // Enter 이벤트 처리
        />
        <S.Price
          placeholder="금액"
          onChange={(e) => onAmountChangeAction(e.target.value)}
          onKeyDown={onKeyDown} // Enter 이벤트 처리
        />
      </S.PriceContainer>
    </S.MainContainer>
  );
}
