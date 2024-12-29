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

  const handleSelectTag = (tagName: string, tagColor: string) => {
    setTagAction(tagName);
    setTagColorAction(tagColor);
    onTagChangeAction(tagName);
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

    if (userId) {
      fetchTags();
    }
  }, [userId]);

  return (
    <S.TagContainer>
      {tags.map((tag) => (
        <S.TagBox
          key={tag.id}
          setting={setting}
          onClick={() => handleSelectTag(tag.name || "태그", tag.color || "")}
        >
          <S.TagColor tagcolor={tag.color || ""} />
          <S.TagText tagcolor={tag.color || ""}>{tag.name}</S.TagText>
        </S.TagBox>
      ))}
    </S.TagContainer>
  );
}
