import { supabase } from "@/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

interface ProtectedRoute {
  component: React.FC;
}

export default function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRoute) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsLoading(false);
      setSession(session);
    }

    fetchSession();
  }, [navigate]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
}
