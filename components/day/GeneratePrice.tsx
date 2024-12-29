"use client";

import * as S from "../../styles/day/generate-price";
import { useState } from "react";
import Tag from "./Tag";

interface PriceProps {
  setting: string;
  onSourceChangeAction: (value: string) => void;
  onAmountChangeAction: (value: string) => void;
  onTagChangeAction: (value: string) => void;
  onKeyDownAction: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  userId: string;
}

export default function GeneratePrice({
  setting,
  onSourceChangeAction,
  onAmountChangeAction,
  onTagChangeAction,
  onKeyDownAction,
  userId,
}: PriceProps) {
  const [tag, setTag] = useState("태그");
  const [tagColor, setTagColor] = useState("");

  return (
    <S.MainContainer setting={setting} tagcolor={tagColor}>
      <S.InputContainer>
        <S.InputTopContainer>
          <S.InputTagContainer tagcolor={tagColor}>{tag}</S.InputTagContainer>
          <S.InputNameContainer>
            <S.PriceName
              placeholder={
                setting === "income" ? "자세한 수입 출처" : "자세한 지출 출처"
              }
              onChange={(e) => onSourceChangeAction(e.target.value)}
              onKeyDown={onKeyDownAction}
              setting={setting}
            />
          </S.InputNameContainer>
        </S.InputTopContainer>
        <S.InputBottomContainer>
          <S.Price
            setting={setting}
            onChange={(e) => onAmountChangeAction(e.target.value)}
            onKeyDown={onKeyDownAction}
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
