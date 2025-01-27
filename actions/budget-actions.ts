"use server";

import { Database } from "../src/types/supabase";
import { createServerSupabaseClient } from "../utils/supabase/server";

export type BudgetInsert = Database["public"]["Tables"]["budget"]["Insert"];
export type BudgetRow = Database["public"]["Tables"]["budget"]["Row"];
export type TagRow = Database["public"]["Tables"]["tag"]["Row"];
export type TagInsert = Database["public"]["Tables"]["tag"]["Insert"];
export type VoteInsert = Database["public"]["Tables"]["vote"]["Insert"];
export type VoteRow = Database["public"]["Tables"]["vote"]["Row"];
import { v4 as uuid } from "uuid";

// 공통 Supabase 클라이언트 생성 함수
async function getSupabaseClient() {
  try {
    return await createServerSupabaseClient();
  } catch (err) {
    console.error("Failed to create Supabase client:", err);
    throw new Error("Supabase client initialization failed.");
  }
}

// 태그 업데이트
export async function updateTag(
  tagId: string,
  tagData: Partial<Omit<TagRow, "id" | "user_id">> // 업데이트할 필드만 전달
): Promise<TagRow | null> {
  try {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase
      .from("tag")
      .update(tagData)
      .eq("id", tagId)
      .select(); // 업데이트된 데이터를 반환

    if (error) {
      console.error("Error updating tag:", error.message);
      return null;
    }

    return data[0] || null; // 업데이트된 첫 번째 태그 반환
  } catch (err) {
    console.error(
      "Unexpected error in updateTag:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

// 태그 가져오기
export async function getTag(userId: string): Promise<TagRow[]> {
  try {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase
      .from("tag")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching tags:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(
      "Unexpected error in getTag:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

// 태그 추가
export async function addTag(
  tagData: Omit<TagRow, "id">
): Promise<TagRow | null> {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from("tag").insert(tagData).select(); // 삽입된 데이터를 반환

    if (error) {
      console.error("Error adding tag:", error.message);
      return null;
    }

    return data[0] || null; // 삽입된 첫 번째 태그 반환
  } catch (err) {
    console.error(
      "Unexpected error in addTag:",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

// 태그 삭제
export async function deleteTag(tagId: string): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient();

    const { error } = await supabase.from("tag").delete().eq("id", tagId);

    if (error) {
      console.error("Error deleting budget:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      "Unexpected error in deleteBudget:",
      err instanceof Error ? err.message : err
    );
    return false;
  }
}

// 예산 추가
export async function addBudget(budgetData: BudgetInsert): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient();

    const { error } = await supabase.from("budget").insert(budgetData);

    if (error) {
      console.error("Error adding budget:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      "Unexpected error in addBudget:",
      err instanceof Error ? err.message : err
    );
    return false;
  }
}

// 예산 가져오기
export async function getBudget(userId: string): Promise<BudgetRow[]> {
  try {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase
      .from("budget")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching budgets:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(
      "Unexpected error in getBudget:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

// 예산 삭제
export async function deleteBudget(budgetId: string): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient();

    const { error } = await supabase
      .from("budget")
      .delete()
      .eq("budget_id", budgetId);

    if (error) {
      console.error("Error deleting budget:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      "Unexpected error in deleteBudget:",
      err instanceof Error ? err.message : err
    );
    return false;
  }
}

export const handleAddImages = async (file: File) => {
  const supabase = await getSupabaseClient();
  try {
    const newFileName = uuid();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`vote/${newFileName}`, file);

    if (error) {
      console.log("파일이 업로드 되지 않습니다.", error);
      return;
    }
    const res = supabase.storage.from("images").getPublicUrl(data.path);
    return res.data.publicUrl;
  } catch (error) {
    console.error(
      "알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.",
      error
    );
  }
};

export async function addVote(voteData: VoteInsert): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient();

    const { error } = await supabase.from("vote").insert(voteData);

    if (error) {
      console.error("Error adding Vote:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      "Unexpected error in addVote:",
      err instanceof Error ? err.message : err
    );
    return false;
  }
}

// 투표 가져오기
export async function getVotes(): Promise<VoteRow[]> {
  try {
    const supabase = await getSupabaseClient();

    const { data, error } = await supabase.from("vote").select("*");

    if (error) {
      console.error("Error fetching votes:", error.message);
      return [];
    }

    if (!data) {
      console.warn("No votes found.");
      return [];
    }

    return data;
  } catch (err) {
    console.error(
      "Unexpected error in getVotes:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export async function deleteVote(voteId: number): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient();

    const { error } = await supabase.from("vote").delete().eq("id", voteId);

    if (error) {
      console.error("Error deleting vote:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(
      "Unexpected error in deleteVote:",
      err instanceof Error ? err.message : err
    );
    return false;
  }
}
