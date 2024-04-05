import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/supabase";
import { SubscriptionStatus } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionContext {
  status: SubscriptionStatus | null;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContext | undefined>(
  {} as SubscriptionContext
);

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { specialist } = useAuth();
  const { toast } = useToast();

  const [status, setStatus] = useState<SubscriptionContext["status"]>(null);
  const [loading, setLoading] = useState<SubscriptionContext["loading"]>(true);

  useEffect(() => {
    async function fetch() {
      if (!specialist) return;

      const { data: subscription, error } = await supabase
        .from("specialists_subscriptions")
        .select()
        .eq("specialist_id", specialist?.id)
        .single();

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
        });
      }

      setStatus(subscription?.status);
      setLoading(false);
    }

    fetch();
  }, [toast, specialist]);
  return (
    <SubscriptionContext.Provider
      value={{
        status,
        loading,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used within an useSubscriptionProvider"
    );
  }
  return context;
};

export { SubscriptionProvider, useSubscription };
