"use client";
import * as S from "../../../styles/day/day";
import { Header } from "../../../styles/header";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client"; // Supabase 클라이언트 가져오기
import { Session } from "@supabase/supabase-js"; // Import Session and Subscription types

const supabase = createClient();

export default function Home() {
  const [setting, setSetting] = useState("income");
  const [session, setSession] = useState<Session | null>(null); // Correctly type the session state

  const toggleSetting = () => {
    setSetting((prevSetting) =>
      prevSetting === "income" ? "outcome" : "income"
    );
  };

  // Track session state on client side
  useEffect(() => {
    // Set initial session state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for session changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    ).data;

    // Cleanup the subscription
    return () => {
      subscription.unsubscribe(); // Properly call unsubscribe
    };
  }, []);

  // Render a loading state while the session is being initialized
  if (session === null) {
    return <S.MainContainer>Loading...</S.MainContainer>;
  }

  return (
    <S.MainContainer>
      <Header />
      <S.SubContainer>
        <S.TotalMainContainer setting={setting}>
          <S.TotalMainText>
            <S.HeaderText setting={setting}>
              {setting === "income" ? "오늘의 수입" : "오늘의 지출"}
            </S.HeaderText>
            <S.TotalText setting={setting}>
              {setting === "income" ? "11만 233원" : "5만 100원"}
            </S.TotalText>
          </S.TotalMainText>
          <S.TotalSubContainer
            setting={setting}
            onClick={toggleSetting}
          ></S.TotalSubContainer>
        </S.TotalMainContainer>
      </S.SubContainer>
    </S.MainContainer>
  );
}
