// context/SessionContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/client";

interface SessionContextProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
