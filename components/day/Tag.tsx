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
  setTagColorAction: (tagColor: string) => void;
  onTagChangeAction: (value: string) => void;
}

export default function Tag({
  setting,
  userId,
  setTagAction,
  setTagColorAction,
  onTagChangeAction,
}: TagProps) {
  const [tags, setTags] = useState<TagRow[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagRow[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const handleSelectTag = (
    tagId: string,
    tagName: string,
    tagColor: string
  ) => {
    setSelectedTagId(tagId);
    setTagAction(tagName);
    setTagColorAction(tagColor);
    onTagChangeAction(tagName);
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTag(userId);
        setTags(fetchedTags);

        // 기본적으로 첫 번째 태그 선택
        if (fetchedTags.length > 0) {
          const firstTag = fetchedTags[0];
          handleSelectTag(
            firstTag.id,
            firstTag.name || "태그",
            firstTag.color || ""
          );
        }
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    if (userId) {
      fetchTags();
    }
  }, [userId]);

  useEffect(() => {
    // setting 값에 따라 태그 필터링
    const filtered = tags.filter((tag) => tag.setting === setting);
    setFilteredTags(filtered);

    // 필터링된 첫 번째 태그 자동 선택
    if (filtered.length > 0) {
      const firstFilteredTag = filtered[0];
      handleSelectTag(
        firstFilteredTag.id,
        firstFilteredTag.name || "태그",
        firstFilteredTag.color || ""
      );
    }
  }, [tags, setting]);

  return (
    <S.TagContainer>
      {filteredTags.map((tag) => (
        <S.TagBox
          key={tag.id}
          setting={setting}
          selected={selectedTagId === tag.id} // 선택된 태그인지 확인
          onClick={() =>
            handleSelectTag(tag.id, tag.name || "태그", tag.color || "")
          }
        >
          <S.TagColor tagcolor={tag.color || ""} />
          <S.TagText
            tagcolor={tag.color || ""}
            style={{
              fontSize: (tag.name ?? "").length > 5 ? "12px" : "15px",
            }}
          >
            {tag.name}
          </S.TagText>
        </S.TagBox>
      ))}
    </S.TagContainer>
  );
}
