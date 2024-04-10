import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/atoms/SectionTitle";
import { Badge } from "@/components/ui/badge";
import AppointmentStatusBadge from "@/components/atoms/AppointmentStatusBadge";
import ClientBillingStatusBadge from "@/components/atoms/ClientBillingStatusBadge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Billings as BillingsType } from "@/types/supabase";

const mockClients = [
  {
    nome: "John Doe",
    email: "johndoe@mail.com",
    phone: "(41) 9 9823-4666",
    CPF: "123.456.780-9",
  },
  {
    nome: "Alice Smith",
    email: "alicesmith@mail.com",
    phone: "(41) 9 9823-4666",
    CPF: "789.123.780-9",
  },
  {
    nome: "Bob Johnson",
    email: "bobjohnson@mail.com",
    phone: "(41) 9 9823-4666",
    CPF: "987.654.321-0",
  },
  {
    nome: "Emma Davis",
    email: "emmadavis@mail.com",
    phone: "(41) 9 9823-4666",
    CPF: "654.321.987-0",
  },
];

const formatDate = (date: string, time: string) => {
  const dataString = time;

  const data = parseISO(dataString);

  const diaSemana = format(data, "EEEE", {
    locale: ptBR,
  });

  const horaMinutos = format(data, "HH:mm");

  const dataFormatada =
    diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1) + ", " + horaMinutos;

  return dataFormatada;
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
            *,
            appointments(*)
          `
        )
        .eq("specialist_id", specialist?.id)
        .returns<BillingsType[]>(),
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
              <span className="text-gray-500">Horário: </span> 11/03/2024 23:23
              {formatDate(
                client.client_schedulingtime[0].scheduled_date,
                client.client_schedulingtime[0].scheduled_time
              )}
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
