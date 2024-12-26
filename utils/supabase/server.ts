"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "../../src/types/supabase";

export const createServerSupabaseClient = async (
  cookieStore = cookies(),
  admin = false
) => {
  // Ensure cookieStore is resolved properly
  const resolvedCookieStore = await cookieStore;

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Properly retrieve cookie values
          return resolvedCookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle potential errors gracefully
            console.warn(
              "Cookie set method failed in a server component",
              error
            );
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            resolvedCookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Handle potential errors gracefully
            console.warn(
              "Cookie remove method failed in a server component",
              error
            );
          }
        },
      },
    }
  );
};

export const createServerSupabaseAdminClient = async (
  cookieStore = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true);
};
