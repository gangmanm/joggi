"use client";

import { useState, useEffect } from "react";
import * as S from "../../../styles/day/day";
import { createClient } from "../../../utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import TotalPrice from "../../../components/day/TotalPrice";
import GeneratePrice from "../../../components/day/GeneratePrice";
import Price from "../../../components/day/Price";

const supabase = createClient();

export default function Home() {
  const [setting, setSetting] = useState("income");
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [showGeneratePrice, setShowGeneratePrice] = useState(false);
  const [entries, setEntries] = useState<{ source: string; amount: string }[]>(
    []
  );
  const [currentEntry, setCurrentEntry] = useState({ source: "", amount: "" });

  const handleInputChange = (field: "source" | "amount", value: string) => {
    setCurrentEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEntryAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEntries((prevEntries) => [...prevEntries, currentEntry]);
      setCurrentEntry({ source: "", amount: "" });
      setShowGeneratePrice(false);
    }
  };

  const toggleSettingAction = () => {
    setSetting((prev) => (prev === "income" ? "outcome" : "income"));
  };

  const toggleGeneratePriceAction = () => {
    setShowGeneratePrice((prev) => !prev);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setSession(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setSession(session);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (session) {
    console.log("사용자 session", session);
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
          <S.TotalSubContainer setting={setting} onClick={toggleSettingAction}>
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
      <S.PriceContainer>
        <TotalPrice
          setting={setting}
          toggleGeneratePrice={toggleGeneratePriceAction}
        />
        {showGeneratePrice && (
          <GeneratePrice
            setting={setting}
            onSourceChangeAction={(value) => handleInputChange("source", value)}
            onAmountChangeAction={(value) => handleInputChange("amount", value)}
            onKeyDown={handleAddEntryAction} // Enter 이벤트 처리
          />
        )}
        {[...entries].reverse().map((entry, index) => (
          <Price
            key={index}
            setting={setting}
            source={entry.source}
            amount={entry.amount}
          />
        ))}
      </S.PriceContainer>
    </S.MainContainer>
  );
}
