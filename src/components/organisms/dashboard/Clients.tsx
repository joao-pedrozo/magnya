import SectionTitle from "@/components/atoms/SectionTitle";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";

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

export default function Clients() {
  return (
    <div>
      <SectionTitle
        title="Clientes"
        subtitle="Aqui você pode visualizar e gerenciar os seus clientes cadastrados."
        className="mb-4"
      />
      <div className="rounded-md">
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
                <TableCell className="text-nowrap">04/04/2024</TableCell>
                <TableCell className="text-nowrap">
                  <Badge className="bg-green-600 hover:bg-green-500">
                    Ativo
                  </Badge>
                </TableCell>
                <TableCell>
                  <Ellipsis className="text-black" size={22} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell>2</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
