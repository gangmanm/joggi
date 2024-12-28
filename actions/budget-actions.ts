"use server";

import { Database } from "../src/types/supabase";
import { createServerSupabaseClient } from "../utils/supabase/server";

export type BudgetInsert = Database["public"]["Tables"]["budget"]["Insert"];
export type BudgetRow = Database["public"]["Tables"]["budget"]["Row"];

export async function addBudget(budgetData: BudgetInsert): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from("budget").insert(budgetData);

    if (error) {
      console.error("Error adding expense:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error in addExpense:", err);
    return false;
  }
}

export async function getBudget(userId: string): Promise<BudgetRow[]> {
  try {
    const supabase = await createServerSupabaseClient();

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
    console.error("Unexpected error in getBudget:", err);
    return [];
  }
}
