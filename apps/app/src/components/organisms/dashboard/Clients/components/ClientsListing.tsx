import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase";
import { useAuth } from "@/hooks/useAuth";
import { parseISO, format } from "date-fns";
// eslint-disable-next-line import/default
import ptBR from "date-fns/locale/pt-BR";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import EditClientForm from "./EditClientForm";
import { useState } from "react";
import { Pen, Trash2 } from "lucide-react";

const formatDate = (date: string, time: string) => {
  const dataString = time;

  const data = parseISO(dataString);

  const diaSemana = format(data, "EEEE", {
    // @ts-expect-error - locale is not recognized by the types
    locale: ptBR,
  });

  const horaMinutos = format(data, "HH:mm");

  const dataFormatada =
    diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1) + ", " + horaMinutos;

  return dataFormatada;
};

export default function ClientsListing() {
  const { toast } = useToast();
  const { specialist } = useAuth();
  const queryClient = useQueryClient();
  const [isEditClientFormOpen, setIsEditClientFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () =>
      await supabase
        .from("clients")
        .select("*, client_schedulingtime(*), appointment_recurrency(*)")
        .eq("specialist_id", specialist?.id),
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (cpf: string) =>
      await supabase.from("clients").delete().match({ cpf }),
    onSuccess: () => {
      toast({
        title: "Cliente removido com sucesso.",
        variant: "destructive",
      });

      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  if (isLoading || !data?.data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.data.map((client) => (
        <div
          key={client.cpf}
          className="border p-4 mt-6 rounded-lg flex flex-col"
        >
          <span className="font-semibold mb-1">
            {client.first_name} {client.last_name}
          </span>
          <span>
            <span className="text-gray-500">Horário:</span>{" "}
            {formatDate(
              client.client_schedulingtime[0].scheduled_date,
              client.client_schedulingtime[0].scheduled_time
            )}
          </span>
          <span>
            <span className="text-gray-500">Valor:</span> R$ 100,00/sessão
          </span>
          <span>
            <span className="text-gray-500">Telefone:</span> {client.phone}
          </span>
          <span>
            <span className="text-gray-500">Email:</span> {client.email}
          </span>
          <div className="flex gap-2 mt-3">
            <Dialog
              onOpenChange={(state) => setIsEditClientFormOpen(state)}
              open={isEditClientFormOpen}
            >
              <DialogTrigger
                onClick={() => setIsEditClientFormOpen(true)}
                asChild
              >
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Pen size={16} className="mr-2" /> Editar cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar cliente</DialogTitle>
                  <DialogDescription>
                    Edite as informações do cliente. Clique em "Salvar" para
                    confirmar.
                  </DialogDescription>
                </DialogHeader>
                <EditClientForm
                  CPF={client.cpf}
                  firstName={client.first_name}
                  lastName={client.last_name}
                  email={client.email}
                  phone={client.phone}
                  date={client.client_schedulingtime[0].scheduled_date}
                  time={client.client_schedulingtime[0].scheduled_time}
                  recurrency={client.appointment_recurrency[0].recurrency}
                  setIsFormDialogOpen={setIsEditClientFormOpen}
                  clientId={client.id}
                />
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800"
                  size="sm"
                >
                  <Trash2 size={16} className="mr-2" />
                  Excluir cliente
                </Button>
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
                  <AlertDialogCancel disabled={deleteClientMutation.isPending}>
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
          </div>
        </div>
      ))}
    </div>
  );
}
