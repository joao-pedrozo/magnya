import { Badge } from "@/components/ui/badge";
import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

const mockSession = {
  id: 1,
};

export default function TableData() {
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
                <Badge className="bg-blue-600 hover:bg-blue-600">
                  Confirmado
                </Badge>
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
                    <DropdownMenuItem className="font-semibold text-yellow-500 cursor-pointer">
                      Reagendar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold text-red-500 cursor-pointer">
                      Cancelar
                    </DropdownMenuItem>
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
