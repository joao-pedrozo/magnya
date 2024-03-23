import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";

type BadgeStatusType = "pending" | "cancelled" | "confirmed" | "completed";

interface AppointmentStatusBadgeProps {
  variant: BadgeStatusType;
}

const statusColor = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
  confirmed: "bg-blue-600 hover:bg-blue-700 text-white hover:text-white",
  completed: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

const statusText = {
  pending: "Pendente",
  cancelled: "Cancelado",
  confirmed: "Confirmado",
  completed: "Concluído",
};

export default function AppointmentStatusBadge({
  variant,
}: AppointmentStatusBadgeProps) {
  return (
    <Badge
      className={clsx(
        "inline-block px-2 py-1 rounded-full text-xs font-semibold",
        statusColor[variant]
      )}
    >
      {statusText[variant]}
    </Badge>
  );
}
