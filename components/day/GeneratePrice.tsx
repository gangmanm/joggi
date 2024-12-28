"use client";

import * as S from "../../styles/day/generate-price";
import { useState } from "react";
import Tag from "./Tag";

interface PriceProps {
  setting: string;
  onSourceChangeAction: (value: string) => void;
  onAmountChangeAction: (value: string) => void;
  onKeyDownAction: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  userId: string;
}

export default function GeneratePrice({
  setting,
  onSourceChangeAction,
  onAmountChangeAction,
  onKeyDownAction,
  userId,
}: PriceProps) {
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [tag, setTag] = useState("태그");

  const toggleTagModal = () => {
    setTagModalVisible((prev) => !prev); // 모달 열고 닫기 상태 토글
  };

  return (
    <S.MainContainer setting={setting}>
      {/* 태그 버튼 */}
      <S.TagContainer setting={setting} onClick={toggleTagModal}>
        {tag}
      </S.TagContainer>

      {/* 태그 모달 */}
      {tagModalVisible && (
        <Tag setting={setting} userId={userId} setTagAction={setTag} />
      )}

      <S.PriceContainer setting={setting}>
        <S.PriceName
          placeholder={
            setting === "income" ? "자세한 수입 출처" : "자세한 지출 출처"
          }
          onChange={(e) => onSourceChangeAction(e.target.value)}
          onKeyDown={onKeyDownAction}
          setting={setting}
        />
        <S.Price
          setting={setting}
          onChange={(e) => onAmountChangeAction(e.target.value)}
          onKeyDown={onKeyDownAction}
          placeholder="금액"
        />
      </S.PriceContainer>
    </S.MainContainer>
  );
}
