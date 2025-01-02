"use client";

import React, { useState, useEffect } from "react";
import { getTag } from "../../../actions/budget-actions";
import { useSessionContext } from "../context/SessionContext";
import { Database } from "../../../src/types/supabase";

export type TagRow = Database["public"]["Tables"]["tag"]["Row"];

export default function Tag() {
  const { session } = useSessionContext();
  const [tags, setTags] = useState<TagRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [setting, setSetting] = useState<string | undefined>(undefined);

  // Parse query string manually
  const getQueryParam = (param: string): string | undefined => {
    if (typeof window === "undefined") return undefined; // Ensure this runs in the browser
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get(param) || undefined;
    } catch (err) {
      console.error("Failed to parse query params:", err);
      return undefined;
    }
  };

  // Fetch the "setting" query parameter on component mount
  useEffect(() => {
    const settingParam = getQueryParam("setting");
    setSetting(settingParam);
  }, []);

  const fetchTags = async () => {
    if (!session?.user?.id) {
      setError("사용자 세션이 필요합니다.");
      return;
    }

    try {
      const userTags = await getTag(session.user.id);
      setTags(userTags || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
      setError("태그를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchTags();
  }, [session?.user?.id]);

  // Filter tags based on the "setting" value
  const filteredTags = tags.filter((tag) => tag.setting === setting);

  return (
    <div>
      <h1>태그 목록</h1>
      {setting ? <p>현재 설정: {setting}</p> : <p>설정이 없습니다.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <li key={tag.id}>
              <strong>{tag.name}</strong> - Color: {tag.color || "없음"}
            </li>
          ))
        ) : (
          <p>해당 설정에 맞는 태그가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
