"use client";

import * as S from "../../styles/day/tag";
import { getTag, addTag } from "../../actions/budget-actions";
import { useState, useEffect } from "react";
import { Database } from "../../src/types/supabase";
export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

interface TagProps {
  setting: string;
  userId: string;
  setTagAction: (name: string) => void;
  setTagModalVisibleAction: (visible: boolean) => void;
  onTagChangeAction: (value: string) => void;
}

export default function Tag({
  setting,
  userId,
  setTagAction,
  setTagModalVisibleAction,
  onTagChangeAction,
}: TagProps) {
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
    setTagModalVisibleAction(false);
    onTagChangeAction(tagName);
  };

  // 태그 추가 핸들러
  const handleAddTag = async () => {
    if (!inputValue.trim()) {
      console.error("Input value is empty!");
      return;
    }

    const newTag: Omit<TagRow, "id"> = {
      name: inputValue.trim(),
      user_id: userId,
      created_at: new Date().toISOString(),
      setting,
    };

    console.log("Adding new tag with data:", newTag);

    try {
      const addedTag = await addTag(newTag); // 새 태그 데이터 반환

      if (addedTag) {
        setTags((prevTags) => [...prevTags, addedTag]); // 반환된 데이터로 상태 업데이트
        setInputValue(""); // 입력값 초기화

        console.log("Tag added successfully!");
      } else {
        console.error("Failed to add tag.");
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
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
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
        />
        <S.TagButton setting={setting} onClick={handleAddTag}>
          +
        </S.TagButton>
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
