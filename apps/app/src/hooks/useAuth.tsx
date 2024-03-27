import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { Specialist } from "@/types/supabase";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  specialist: Specialist | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch session function
  const fetchSession = async () => {
    const { data: data } = await supabase.auth.getSession();
    const { data: specialist } = await supabase
      .from("specialists")
      .select("*")
      .eq("auth_id", data?.session?.user.id)
      .returns<Specialist[]>();

    if (data && specialist) {
      setSession(data.session);
      setSpecialist(specialist[0]);
    } else {
      setSession(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, specialist }}>
      {children}
    </AuthContext.Provider>
  );
};
