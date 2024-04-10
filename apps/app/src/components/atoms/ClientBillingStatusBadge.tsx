import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";

type BadgeStatusType = "pending" | "paid" | "overdue";

interface ClientBillingStatusBadgeProps {
  variant: BadgeStatusType;
}

const statusColor = {
  pending: "bg-yellow-500 text-yellow-800 hover:bg-yellow-200",
  paid: "bg-green-600 text-white hover:bg-green-700",
  overdue: "bg-red-500 text-red-800 hover:bg-red-200",
};

const statusText = {
  pending: "Pendente",
  paid: "Pago",
  overdue: "Atrasado",
};

export default function ClientBillingStatusBadge({
  variant,
}: ClientBillingStatusBadgeProps) {
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
