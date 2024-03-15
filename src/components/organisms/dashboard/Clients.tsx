import SectionTitle from "@/components/atoms/SectionTitle";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CalendarIcon, Ellipsis, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

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
  const [date, setDate] = useState<Date>();

  return (
    <div>
      <SectionTitle
        title="Clientes"
        subtitle="Aqui você pode visualizar e gerenciar os seus clientes cadastrados."
        className="mb-4"
      />
      <div className="rounded-md">
        <div className="flex justify-between text-md">
          {/* <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <span className="text-[18px] font-medium ">Total</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-[16px] text-zinc-800">12 clientes</span>
            </div>
          </div> */}
          <div className="relative">
            <Search
              className="absolute top-[9px] left-[12px] text-zinc-500"
              size={20}
            />
            <Input
              placeholder="Procure por nome"
              type="text"
              className="w-fit mb-4 pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger>
              <Button className="bg-blue-700 gap-2 hover:bg-blue-800">
                <Plus />
                <span className="font-semibold">Adicionar cliente</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar cliente</DialogTitle>
                <DialogDescription>
                  Preencha o formulário abaixo para adicionar um novo cliente.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-nowrap">
                      Nome
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="email" className="text-right text-nowrap">
                      Telefone
                    </Label>
                    <Input id="Telefone" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-6 items-center gap-4">
                    <Label htmlFor="CPF" className="text-right text-nowrap">
                      CPF
                    </Label>
                    <Input id="cpf" className="col-span-3" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-4 items-center">
                      <span className="text-nowrap">Escolha um dia: </span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "max-w-[680px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="email" className="text-right text-nowrap">
                      Escolha um horário
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="email" className="text-right text-nowrap">
                      Defina uma frequência
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                  <Button className="bg-blue-700 gap-2 hover:bg-blue-800">
                    <span className="font-semibold ">Adicionar cliente</span>
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
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
                  <Badge className="bg-green-600 hover:bg-green-500">
                    Ativo
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
