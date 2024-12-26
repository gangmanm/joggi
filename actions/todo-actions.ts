"use server";

import { Database } from "../src/types/supabase";
import { createServerSupabaseClient } from "../utils/supabase/server";

export type ExpenseRow = Database["public"]["Tables"]["expense"]["Row"];
export type ExpenseInsert = Database["public"]["Tables"]["expense"]["Insert"];
export type ExpenseUpdate = Database["public"]["Tables"]["expense"]["Update"];

export async function getExpense(): Promise<ExpenseRow[]> {
  try {
    // Supabase 클라이언트 생성
    const supabase = await createServerSupabaseClient();

    // 데이터 조회
    const { data, error } = await supabase.from("expense").select("*");

    // 오류 처리
    if (error) {
      console.error("Error fetching expenses:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    // 예기치 않은 오류 처리
    console.error("Unexpected error in getExpense:", err);
    return [];
  }
}
