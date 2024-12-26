"use client";

import * as S from "../../../styles/day/day";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { Session } from "@supabase/supabase-js";

const supabase = createClient();

export default function Home() {
  const [setting, setSetting] = useState("income");
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const toggleSetting = () => {
    setSetting((prevSetting) =>
      prevSetting === "income" ? "outcome" : "income"
    );
  };

  useEffect(() => {
    let isMounted = true;

    // Set initial session state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setSession(session);
      }
    });

    // Listen for session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setSession(session);
      }
    });

    // Cleanup the subscription
    return () => {
      isMounted = false;
      subscription.unsubscribe(); // Properly unsubscribe
    };
  }, []);

  if (session === undefined) {
    return <S.MainContainer>Loading...</S.MainContainer>;
  }

  return (
    <S.MainContainer>
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
          <S.TotalSubContainer setting={setting} onClick={toggleSetting}>
            <S.TotalSubText>
              <S.SubHeaderText setting={setting}>
                {setting === "income" ? "오늘의 지출" : "오늘의 수입"}
              </S.SubHeaderText>
              <S.SubTotalText setting={setting}>
                {setting === "income" ? "5만 100원" : "11만 233원"}
              </S.SubTotalText>
            </S.TotalSubText>
          </S.TotalSubContainer>
        </S.TotalMainContainer>
      </S.SubContainer>
    </S.MainContainer>
  );
}
