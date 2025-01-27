"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleRouteToTag = (setting: string) => {
    const queryString = `?setting=${encodeURIComponent(setting)}`;
    router.push(`/tag${queryString}`);
  };

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
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
              const formattedValue = Number(rawValue).toLocaleString(); // 숫자 형식 변환
              onAmountChangeAction(rawValue); // 원시 숫자 값 전달 (필요하면 이 값을 서버에 저장)
              e.target.value = formattedValue; // 포맷된 값 UI에 반영
            }}
            placeholder="금액"
          />
        </S.InputBottomContainer>
      </S.InputContainer>
      <S.TagMenu onClick={() => handleRouteToTag(setting)}>
        태그 추가하기
      </S.TagMenu>
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
