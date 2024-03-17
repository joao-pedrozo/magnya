import { Ellipsis } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

export default function ClientsListing() {
  return (
    <Table className="border rounded-xl border-separate border-spacing-x-[12px] border-spacing-y-[8px]">
      <TableHeader>
        <TableRow>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Nome
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Email
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Telefone
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            CPF
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Data de cadastro
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Próxima sessão
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Status
          </TableHead>
          <TableHead className="text-zinc-500 font-medium text-nowrap">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockClients.map((client) => (
          <TableRow key={client.CPF} className="text-black text-nowrap">
            <TableCell className="font-medium text-nowrap">
              {client.nome}
            </TableCell>
            <TableCell className="text-nowrap">{client.email}</TableCell>
            <TableCell className="text-nowrap">{client.phone}</TableCell>
            <TableCell className="text-nowrap">{client.CPF}</TableCell>
            <TableCell className="text-nowrap">10/10/2020</TableCell>
            <TableCell className="text-nowrap">04/04 - 15:00</TableCell>
            <TableCell className="text-nowrap">
              <Badge className="bg-green-600 hover:bg-green-500">Ativo</Badge>
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
                  <DropdownMenuItem className="font-semibold text-blue-500 cursor-pointer">
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold text-red-400 cursor-pointer">
                    Remover
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
