"use server";

import { Database } from "@/types/supabase";
import { createServerSupabaseClient } from "../utils/supabase/server";

export type ExpenseRow = Database["public"]["Tables"]["expense"]["Row"];
export type ExpenseInsert = Database["public"]["Tables"]["expense"]["Insert"];
export type ExpenseUpdate = Database["public"]["Tables"]["expense"]["Update"];

export async function getExpense(
  searchInput = ""
): Promise<ExpenseRow[] | null> {
  try {
    // Supabase 클라이언트 인스턴스를 가져오기
    const supabase = await createServerSupabaseClient();

    // 데이터 조회
    const { data, error } = await supabase
      .from("expense")
      .select("*")
      .like("title", `%${searchInput}%`)
      .order("created_at", { ascending: true });

    // 오류 처리
    if (error) {
      console.error("Error fetching expenses:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}
