// AuthProvider.tsx (Client Component)
"use client";

import { useEffect } from "react";
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("사용자가 로그인했습니다:", session);
      } else {
        console.log("사용자가 로그아웃했습니다.");
      }
    });

    // Cleanup the subscription
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "http://localhost:3000",
      },
    });

    if (error) {
      console.error("로그인 오류:", error.message);
    } else {
      console.log("로그인 성공:", data);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {children}
    </div>
  );
}
