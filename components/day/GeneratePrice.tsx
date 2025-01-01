"use client";

import * as S from "../../styles/day/generate-price";
import { useState } from "react";
import Tag from "./Tag";

interface PriceProps {
  setting: string;
  onSourceChangeAction: (value: string) => void;
  onAmountChangeAction: (value: string) => void;
  onTagChangeAction: (value: string) => void;
  onAddBudgetAction: () => void;
  userId: string;
}

export default function GeneratePrice({
  setting,
  onSourceChangeAction,
  onAmountChangeAction,
  onTagChangeAction,
  onAddBudgetAction,
  userId,
}: PriceProps) {
  const [tag, setTag] = useState("태그");
  const [tagColor, setTagColor] = useState("");

  return (
    <S.MainContainer setting={setting} tagcolor={tagColor}>
      <S.Header>
        <S.HeaderButton onClick={() => onAddBudgetAction()}>+</S.HeaderButton>
      </S.Header>
      <S.InputContainer>
        <S.InputTopContainer>
          <S.InputTagContainer tagcolor={tagColor}>{tag}</S.InputTagContainer>
          <S.InputNameContainer>
            <S.PriceName
              placeholder={
                setting === "income" ? "자세한 수입 출처" : "자세한 지출 출처"
              }
              onChange={(e) => onSourceChangeAction(e.target.value)}
              setting={setting}
            />
          </S.InputNameContainer>
        </S.InputTopContainer>
        <S.InputBottomContainer>
          <S.Price
            setting={setting}
            onChange={(e) => onAmountChangeAction(e.target.value)}
            placeholder="금액"
          />
        </S.InputBottomContainer>
      </S.InputContainer>
      <S.TagMenu></S.TagMenu>
      <Tag
        setting={setting}
        userId={userId}
        setTagAction={setTag}
        setTagColorAction={setTagColor}
        onTagChangeAction={onTagChangeAction}
      />
    </S.MainContainer>
  );
}
