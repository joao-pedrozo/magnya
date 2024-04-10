import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import AppointmentStatusBadge from "@/components/atoms/AppointmentStatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

const formatDate = (date: string) => {
  return format(date, "dd/MM/yyyy");
};

export default function AppointmentsListing() {
  // const [isRescheduleFormDialogOpen, setIsRescheduleFormDialogOpen] =
  //   useState(false);

  const { specialist } = useAuth();

  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: async () =>
      await supabase
        .from("appointments")
        .select(
          `
            *, clients(*) 
          `
        )
        .eq("specialist_id", specialist?.id),
  });

  if (appointments.isLoading) {
    return <p>Carregando...</p>;
  }

  if (appointments.data?.data?.length === 0) {
    return <p>Nenhum agendamento encontrado.</p>;
  }

  return (
    <div>
      {appointments.data?.data &&
        appointments.data.data.map((appointment) => (
          <div
            key={appointment.appointment_id}
            className="border p-4 mt-6 rounded-lg flex flex-col gap-1"
          >
            <span className="font-semibold mb-1">{`${appointment.clients.first_name} ${appointment.clients.last_name}`}</span>
            <span>
              <span className="text-gray-500">Data: </span>
              {formatDate(appointment.scheduled_date)}
            </span>
            <span>
              <span className="text-gray-500">Valor:</span> R$ 100,00
            </span>
            <span>
              <span className="text-gray-500">Confirmação:</span>{" "}
              <AppointmentStatusBadge variant={appointment.status} />
            </span>
            <div className="flex gap-2 mt-3">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Reagendar
              </Button>
              <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                Cancelar
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
