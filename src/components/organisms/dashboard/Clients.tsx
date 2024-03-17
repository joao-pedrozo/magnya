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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { supabase } from "@/supabase";

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

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  CPF: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  recurrency: z.string().min(1),
});

const mockSession = {
  id: 1,
};

export default function Clients() {
  const clientMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      console.log("z");

      const { data: results } = await supabase
        .from("clients")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          cpf: data.CPF,
        })
        .select();

      if (!results?.length) return;

      console.log("zX");

      await supabase.from("appointment_recurrency").insert({
        client_id: results[0].id,
        specialist_id: mockSession.id,
        recurrency: data.recurrency,
      });

      await supabase.from("appointments").insert({
        client_id: results[0].id,
        specialist_id: mockSession.id,
        date: data.date,
        time: data.time,
        value: 100,
      });
    },
    onSuccess: () => {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    clientMutation.mutate(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toDateString(),
    },
  });

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
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Pedro" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Nome
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Santos" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="E-mail" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Telefone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="(41) 9 9999-9999" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="CPF"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          CPF
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="123.456.789-00" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Dia da sessão
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "max-w-[680px] justify-start text-left font-normal",
                                  !form.getValues("date") &&
                                    "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {form.getValues("date") ? (
                                  format(form.getValues("date"), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={new Date(form.getValues("date"))}
                                onSelect={(date) =>
                                  form.setValue("date", date!.toDateString())
                                }
                                disabled={(currentDate) => {
                                  const isToday = (date: Date) => {
                                    const today = new Date();
                                    return (
                                      date.getDate() === today.getDate() &&
                                      date.getMonth() === today.getMonth() &&
                                      date.getFullYear() === today.getFullYear()
                                    );
                                  };

                                  return (
                                    !isToday(currentDate) &&
                                    currentDate < new Date()
                                  );
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Horário
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="15:00" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recurrency"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormLabel className="min-w-[85px] text-end">
                          Recorrência
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Semanal" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-800"
                    onClick={() => {
                      console.log(form.formState.errors);
                    }}
                  >
                    Adicionar
                  </Button>
                </form>
              </Form>
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
        </Table>
      </div>
    </div>
  );
}
