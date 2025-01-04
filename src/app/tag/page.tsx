"use client";
import React, { useState, useEffect } from "react";
import {
  getTag,
  addTag,
  getBudget,
  deleteBudget,
  deleteTag,
  updateTag,
} from "../../../actions/budget-actions";
import { useSessionContext } from "../context/SessionContext";
import { Database } from "../../../src/types/supabase";
import * as S from "../../../styles/tag/tag";
import { HexColorPicker } from "react-colorful";
import type { Tag } from "../../types/budget";
import Warning from "../../../components/Warning";
export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

export default function Tag() {
  const { session } = useSessionContext();
  const [tags, setTags] = useState<TagRow[]>([]);
  const [setting, setSetting] = useState<"income" | "outcome" | undefined>(
    "income"
  );
  const [color, setColor] = useState("#aabbcc");
  const [newTagName, setNewTagName] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagRow | null>(null);
  const [warningOpen, setWarningOpen] = useState(false);
  const [tagButtonName, setTagButtonName] = useState("태그 추가하기");

  const handleAddTagAction = async () => {
    if (tagButtonName === "태그 추가하기") {
      if (!newTagName) {
        alert("태그 명을 입력하세요");
      }

      const tagExist = tags.filter((tag) => tag.name === newTagName);

      if (tagExist.length > 0) {
        alert("이미 존재하는 태그입니다.");
        return;
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
      } catch (err) {
        console.error(err);
      }
    } else {
      if (!selectedTag || !selectedTag.id) {
        console.error("Selected tag or tag ID is missing.");
        return;
      }

      const updatedTag = await updateTag(selectedTag.id, {
        name: newTagName,
        color: color,
      });

      if (updatedTag) {
        alert("태그가 수정되었습니다");
        setTagButtonName("태그 추가하기");
        setNewTagName("");
      } else {
        console.error("Failed to update tag.");
      }
    }

    const userTags = await getTag(session?.user.id || "");
    setTags(userTags || []);
  };

  const handleMenuClick = (event: React.MouseEvent, tag: TagRow) => {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setMenuPosition({ x: rect.left + rect.width / 3, y: rect.top + 20 });
    setSelectedTag(tag);
  };

  const onClickDelete = async () => {
    try {
      if (!selectedTag) {
        alert("삭제할 태그를 선택하세요.");
        return;
      }

      const budgets = await getBudget(session?.user.id || "");

      // 해당 태그와 연결된 예산 필터링
      const filteredBudget = budgets.filter(
        (budget) => budget.tag === selectedTag.name
      );

      // 예산 삭제
      for (const budget of filteredBudget) {
        const success = await deleteBudget(budget.budget_id);
        if (!success) {
          console.error(`Failed to delete budget with ID: ${budget.budget_id}`);
        }
      }

      alert("태그와 관련된 예산이 삭제되었습니다.");
      await deleteTag(selectedTag.id);
      const userTags = await getTag(session?.user.id || "");
      setTags(userTags || []);
      setWarningOpen(false);
    } catch (err) {
      console.error("Failed to delete budgets:", err);
      alert("예산 삭제 중 오류가 발생했습니다.");
    }
  };
  const onClickEdit = () => {
    setTagButtonName("태그 편집하기");
    setNewTagName(selectedTag?.name || ""); // 기본값 처리
    setColor(selectedTag?.color || ""); // 기본값 처리
  };

  const closeMenu = () => {
    setMenuPosition(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      closeMenu();
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            {tagButtonName}
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
                {tag.name}
              </S.TagText>
              <S.TagMenu
                tagcolor={tag.color || "#ccc"}
                onClick={(e) => handleMenuClick(e, tag)}
              >
                ...
              </S.TagMenu>
            </S.TagBox>
          ))
        ) : (
          <p>해당 설정에 맞는 태그가 없습니다.</p>
        )}
      </S.TagContainer>
      {menuPosition && selectedTag && (
        <S.TagMenuContainer
          style={{
            position: "fixed",
            top: menuPosition.y,
            left: menuPosition.x,
          }}
        >
          <S.TagMenuText onClick={onClickEdit}>편집하기</S.TagMenuText>
          <S.TagMenuText onClick={() => setWarningOpen(true)}>
            삭제하기
          </S.TagMenuText>
          {/* 추가 메뉴 내용 */}
          <S.TagMenuText onClick={closeMenu}>닫기</S.TagMenuText>
        </S.TagMenuContainer>
      )}
      {warningOpen ? (
        <Warning
          message="태그를 삭제하시겠습니까? 태그로 작성된 가계 항목들도 모두 삭제됩니다."
          onNoAction={() => setWarningOpen(false)}
          onYesAction={onClickDelete}
        />
      ) : (
        ""
      )}
    </S.MainContainer>
  );
}
