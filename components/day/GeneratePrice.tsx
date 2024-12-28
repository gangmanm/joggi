"use client";
import * as S from "../../styles/day/generate-price";

interface PriceProps {
  setting: string;
  onSourceChangeAction: (value: string) => void;
  onAmountChangeAction: (value: string) => void;
  onKeyDownAction: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Enter 이벤트 Prop 추가
}

export default function GeneratePrice({
  setting,
  onSourceChangeAction,
  onAmountChangeAction,
  onKeyDownAction,
}: PriceProps) {
  return (
    <S.MainContainer setting={setting}>
      <S.TagContainer setting={setting}>태그</S.TagContainer>
      <S.PriceContainer setting={setting}>
        <S.PriceName
          placeholder="자세한 수입 출처"
          onChange={(e) => onSourceChangeAction(e.target.value)}
          onKeyDown={onKeyDownAction} // Enter 이벤트 처리
          setting={setting}
        />
        <S.Price
          setting={setting}
          onChange={(e) => onAmountChangeAction(e.target.value)}
          onKeyDown={onKeyDownAction} // Enter 이벤트 처리
          placeholder="금액"
        />
      </S.PriceContainer>
    </S.MainContainer>
  );
}
