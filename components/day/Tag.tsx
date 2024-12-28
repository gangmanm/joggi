"use client";

import * as S from "../../styles/day/tag";
import { getTag } from "../../actions/budget-actions";
import { useState, useEffect } from "react";
import { Database } from "../../src/types/supabase";

export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

interface TagProps {
  setting: string;
  userId: string;
  setTagAction: (name: string) => void;
}

export default function Tag({ setting, userId, setTagAction }: TagProps) {
  const [tags, setTags] = useState<TagRow[]>([]);
  const [inputValue, setInputValue] = useState("");

  // 입력값 변경 핸들러 (7글자 제한)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setInputValue(value);
    }
  };

  // 태그 선택 핸들러
  const handleSelectTag = (tagName: string) => {
    setTagAction(tagName); // 선택된 태그 업데이트
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTag(userId);
        setTags(fetchedTags);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, [userId]);

  return (
    <S.TagContainer>
      {/* 태그 입력 및 추가 */}
      <S.TagBox setting={setting}>
        <S.TagInput
          setting={setting}
          placeholder="태그 추가"
          value={inputValue}
          onChange={handleChange}
        />
        <S.TagButton setting={setting}>+</S.TagButton>
      </S.TagBox>

      {/* 기존 태그 목록 */}
      {tags.map((tag) => (
        <S.TagBox key={tag.id} setting={setting}>
          <S.TagText
            setting={setting}
            onClick={() => handleSelectTag(tag.name || "태그")}
          >
            {tag.name}
          </S.TagText>
          <S.TagButton setting={setting}>x</S.TagButton>
        </S.TagBox>
      ))}
    </S.TagContainer>
  );
}
