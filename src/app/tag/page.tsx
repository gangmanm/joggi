"use client";

import React, { useState, useEffect } from "react";
import { getTag, addTag } from "../../../actions/budget-actions";
import { useSessionContext } from "../context/SessionContext";
import { Database } from "../../../src/types/supabase";
import * as S from "../../../styles/tag/tag";
import { HexColorPicker } from "react-colorful";
import type { Tag } from "../../types/budget";

export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

export default function Tag() {
  const { session } = useSessionContext();
  const [tags, setTags] = useState<TagRow[]>([]);
  const [setting, setSetting] = useState<"income" | "outcome" | undefined>(
    "income"
  );
  const [color, setColor] = useState("#aabbcc");
  const [newTagName, setNewTagName] = useState<string>("");

  const handleAddTagAction = async () => {
    if (!newTagName) {
      alert("태그 명을 입력하세요");
    }
    try {
      const newTag: Omit<Tag, "id"> = {
        name: newTagName,
        color,
        setting: setting || "income",
        created_at: new Date().toISOString(),
        user_id: session?.user.id || "",
      };
      const success = await addTag(newTag);

      if (!success) throw new Error("Add Tag failed");

      const userTags = await getTag(session?.user.id || "");
      setTags(userTags || []);
    } catch (err) {
      console.error(err);
    }
  };
  const getQueryParam = (param: string): string | undefined => {
    if (typeof window === "undefined") return undefined; // Ensure browser environment
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(param) || undefined;
    } catch (err) {
      console.error("Failed to parse query params:", err);
      return undefined;
    }
  };

  useEffect(() => {
    const settingParam = getQueryParam("setting") as
      | "income"
      | "outcome"
      | undefined;
    setSetting(settingParam || "income"); // 기본값으로 "income" 설정
  }, []);

  const fetchTags = async () => {
    if (!session?.user?.id) {
      return;
    }

    try {
      const userTags = await getTag(session.user.id);
      setTags(userTags || []);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
    }
  };

  useEffect(() => {
    fetchTags();
  }, [session?.user?.id]);

  // Filter tags by "setting"
  const filteredTags = tags.filter((tag) => tag.setting === setting);

  return (
    <S.MainContainer>
      <S.Header setting={setting || "income"}>
        {setting === "income" ? "수입" : "지출"} 태그 목록
      </S.Header>
      <S.TagGenerate setting={setting || "income"}>
        <S.TagGenerateBox setting={setting || "income"}>
          <S.TagGenerateColor tagcolor={color || "#ccc"}></S.TagGenerateColor>
          <S.TagGenerateInput
            tagcolor={color || "#ccc"}
            placeholder="태그 명 입력"
            value={newTagName}
            onChange={(e) => {
              if (e.target.value.length <= 6) {
                setNewTagName(e.target.value);
              }
            }}
          ></S.TagGenerateInput>
        </S.TagGenerateBox>
        <S.TagColorBox setting={setting || "income"}>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{ width: "100%", height: "150px" }}
          />

          <S.TagAddButton
            setting={setting || "income"}
            onClick={handleAddTagAction}
          >
            태그 추가하기
          </S.TagAddButton>
        </S.TagColorBox>
      </S.TagGenerate>
      <S.TagContainer>
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <S.TagBox key={tag.id}>
              <S.TagColor tagcolor={tag.color || "#ccc"} />
              <S.TagText
                style={{
                  fontSize: (tag.name ?? "").length > 5 ? "12px" : "15px",
                }}
                tagcolor={tag.color || "#ccc"}
              >
                {tag.name || "기본 태그 이름"}
              </S.TagText>
            </S.TagBox>
          ))
        ) : (
          <p>해당 설정에 맞는 태그가 없습니다.</p>
        )}
      </S.TagContainer>
    </S.MainContainer>
  );
}
