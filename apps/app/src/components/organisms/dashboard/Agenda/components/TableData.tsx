import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RescheduleForm from "./RescheduleForm";
import { useState } from "react";
import AppointmentStatusBadge from "@/components/atoms/AppointmentStatusBadge";

const mockSession = {
  id: 1,
};

export default function TableData() {
  const [isRescheduleFormDialogOpen, setIsRescheduleFormDialogOpen] =
    useState(false);

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
        .eq("specialist_id", mockSession.id),
  });

  return (
    <Table className="border rounded-xl border-separate border-spacing-x-[28px] border-spacing-y-[8px]">
      <TableHeader>
        <TableRow>
          <TableHead>Nome do cliente</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Hora</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      {appointments.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <TableBody>
          {appointments.data?.data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="font-semibold">
                  {item.clients.first_name} {item.clients.last_name}
                </span>
              </TableCell>
              <TableCell>
                <span>{item.date}</span>
              </TableCell>
              <TableCell>
                <span>{item.time}</span>
              </TableCell>
              <TableCell>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.value)}
                </span>
              </TableCell>
              <TableCell>
                <AppointmentStatusBadge variant={item.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog
                      onOpenChange={(state) =>
                        setIsRescheduleFormDialogOpen(state)
                      }
                      open={isRescheduleFormDialogOpen}
                    >
                      <DialogTrigger
                        onClick={() => setIsRescheduleFormDialogOpen(true)}
                        className="min-w-0 px-2 py-1"
                      >
                        <span className="font-semibold text-blue-600 text-sm cursor-pointer">
                          Reagendar
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-[760px]">
                        <DialogHeader>
                          <DialogTitle>Reagendar</DialogTitle>
                          <DialogDescription>
                            Preencha o formulário abaixo para reagendar o
                            agendamento.
                          </DialogDescription>
                        </DialogHeader>
                        <RescheduleForm
                          clientCpf={item.clients.cpf}
                          date={item.date}
                          time={item.time}
                          value={item.value}
                          appointmentId={item.appointment_id}
                          setIsFormOpen={setIsRescheduleFormDialogOpen}
                        />
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
