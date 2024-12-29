"use client";

import * as S from "../../styles/day/tag";
import { getTag, addTag, deleteTag } from "../../actions/budget-actions";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setInputValue(value);
    }
  };

  const handleSelectTag = (tagName: string) => {
    setTagAction(tagName);
    setTagModalVisibleAction(false);
    onTagChangeAction(tagName);
  };

  const handleDelete = async (tagId: string) => {
    const success = await deleteTag(tagId);

    if (success) {
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
    } else {
      console.error("Failed to delete budget.");
    }
  };

  const handleAddTag = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("handleAddTag triggered");

    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      console.log("Enter key detected");

      e.preventDefault();

      if (!inputValue.trim()) {
        console.error("Input value is empty!");
        return;
      }

      if (tags.some((tag) => tag.name === inputValue.trim())) {
        console.error("Tag already exists!");
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
        const addedTag = await addTag(newTag);

        if (addedTag) {
          setTags((prevTags) => [...prevTags, addedTag]);
          setInputValue("");
          console.log("Tag added successfully!");
        } else {
          console.error("Failed to add tag.");
        }
      } catch (error) {
        console.error("Error adding tag:", error);
      }
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

    if (userId) {
      fetchTags();
    }
  }, [userId]);

  return (
    <S.TagContainer>
      <S.TagBox setting={setting}>
        <S.TagInput
          setting={setting}
          placeholder="태그 추가"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleAddTag}
        />
      </S.TagBox>

      {tags.map((tag) => (
        <S.TagBox key={tag.id} setting={setting}>
          <S.TagText
            setting={setting}
            onClick={() => handleSelectTag(tag.name || "태그")}
          >
            {tag.name}
          </S.TagText>
          <S.TagButton setting={setting} onClick={() => handleDelete(tag.id)}>
            x
          </S.TagButton>
        </S.TagBox>
      ))}
    </S.TagContainer>
  );
}
