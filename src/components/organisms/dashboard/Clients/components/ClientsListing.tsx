import { Ellipsis } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { supabase } from "@/supabase";
import { Tables } from "database.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function ClientsListing() {
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => await supabase.from("clients").select("*"),
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (cpf: string) =>
      await supabase.from("clients").delete().match({ cpf }),
    onSuccess: () => {
      toast({
        title: "Cliente removido com sucesso.",
      });
    },
  });

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

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
        {data.data?.map((client: Tables<"clients">) => {
          const formattedDate = new Date(client.created_at!).toLocaleDateString(
            "pt-BR"
          );

          return (
            <TableRow key={client.cpf} className="text-black text-nowrap">
              <TableCell className="font-medium text-nowrap">
                {client.first_name} {client.last_name}
              </TableCell>
              <TableCell className="text-nowrap">{client.email}</TableCell>
              <TableCell className="text-nowrap">{client.phone}</TableCell>
              <TableCell className="text-nowrap">{client.cpf}</TableCell>
              <TableCell className="text-nowrap">{formattedDate}</TableCell>
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
                    <DropdownMenuItem>
                      <span className="font-semibold text-blue-500 cursor-pointer">
                        Editar
                      </span>
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className="font-semibold text-red-400 cursor-pointer text-sm ml-2">
                          Excluir
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Tem certeza que deseja excluir?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            disabled={deleteClientMutation.isPending}
                          >
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-700 hover:bg-red-800"
                            disabled={deleteClientMutation.isPending}
                            onClick={() => {
                              deleteClientMutation.mutate(client.cpf!);
                            }}
                          >
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
