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

const mockData = [
  {
    cliente: "John Doe",
    data: "12/10/2021",
    hora: "14:00",
    valor: "R$ 150,00",
    status: "Confirmado",
  },
  {
    cliente: "Jane Smith",
    data: "15/10/2021",
    hora: "10:30",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    cliente: "Michael Johnson",
    data: "18/10/2021",
    hora: "16:45",
    valor: "R$ 120,00",
    status: "Pendente",
  },
  {
    cliente: "Emily Davis",
    data: "20/10/2021",
    hora: "09:15",
    valor: "R$ 180,00",
    status: "Confirmado",
  },
  {
    cliente: "David Wilson",
    data: "22/10/2021",
    hora: "13:30",
    valor: "R$ 90,00",
    status: "Cancelado",
  },
  {
    cliente: "Olivia Taylor",
    data: "25/10/2021",
    hora: "11:00",
    valor: "R$ 150,00",
    status: "Confirmado",
  },
];

export default function TableData() {
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
      <TableBody>
        {mockData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <span className="font-semibold">{item.cliente}</span>
            </TableCell>
            <TableCell>
              <span>{item.data}</span>
            </TableCell>
            <TableCell>
              <span>{item.hora}</span>
            </TableCell>
            <TableCell>
              <span>{item.valor}</span>
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
    </Table>
  );
}
