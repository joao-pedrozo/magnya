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

export default function Billings() {
  return (
    <div>
      <SectionTitle
        title="Cobranças"
        subtitle="Aqui você pode acompanhar e gerenciar todas as cobranças de seus clientes."
        className="mb-4"
      />
      <Table className="border rounded-xl border-separate border-spacing-x-[12px] border-spacing-y-[8px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-500 font-medium text-nowrap">
              Código
            </TableHead>
            <TableHead className="text-zinc-500 font-medium text-nowrap">
              Nome do cliente
            </TableHead>
            <TableHead className="text-zinc-500 font-medium text-nowrap">
              Data de emissão
            </TableHead>
            <TableHead className="text-zinc-500 font-medium text-nowrap">
              Valor
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
              <TableCell className="font-medium text-nowrap">0001</TableCell>
              <TableCell className="text-nowrap">{client.nome}</TableCell>
              <TableCell className="text-nowrap">04/04/2024</TableCell>
              <TableCell className="text-nowrap">R$ 120,00</TableCell>
              <TableCell className="text-nowrap">
                <Badge className="bg-green-600 hover:bg-green-700">Pago</Badge>
              </TableCell>
              <TableCell className="text-nowrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                    <DropdownMenuItem>Cancelar cobrança</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
