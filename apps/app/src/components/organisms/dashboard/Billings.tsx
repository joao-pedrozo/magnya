import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/atoms/SectionTitle";
import ClientBillingStatusBadge from "@/components/atoms/ClientBillingStatusBadge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

const formatDate = (date: string) => {
  return format(date, "dd/MM/yyyy");
};

export default function Billings() {
  const { specialist } = useAuth();

  const billings = useQuery({
    queryKey: ["billings"],
    queryFn: async () =>
      await supabase
        .from("billings")
        .select(
          `
            *, appointments(*, clients(*)) 
          `
        )
        .eq("specialist_id", specialist?.id),
  });

  return (
    <div>
      <SectionTitle
        title="Cobranças"
        subtitle="Aqui você pode acompanhar e gerenciar todas as cobranças de seus clientes."
        className="mb-4"
      />

      {billings.isLoading && <p>Carregando...</p>}
      {billings.data?.data &&
        billings.data.data.map((billing) => (
          <div
            key={billing.billing_id}
            className="border p-4 mt-6 rounded-lg flex flex-col"
          >
            <span className="font-semibold mb-1">Pedro Santos</span>
            <span>
              <span className="text-gray-500">Data: </span>
              {formatDate(billing.appointments.scheduled_date)}
            </span>
            <span>
              <span className="text-gray-500">Valor:</span> R$ 100,00
            </span>
            <span>
              <span className="text-gray-500">Status:</span>{" "}
              <ClientBillingStatusBadge variant="paid" />
            </span>
            <div className="flex gap-2 mt-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Ver detalhes
              </Button>
              <Button
                className="w-full bg-green-800 hover:bg-green-900"
                size="sm"
              >
                Marcar como pago
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
