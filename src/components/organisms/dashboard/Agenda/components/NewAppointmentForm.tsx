import { CalendarPlus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cpf: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  value: z.number().min(1),
});

export default function NewAppointmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 gap-2 hover:bg-blue-800">
          <CalendarPlus size={20} />
          <span className="font-semibold">Cadastrar agendamento</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar agendamento</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo agendamento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="min-w-[85px] text-end">
                    Cliente
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="123.456.789-00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="min-w-[85px] text-end">Data</FormLabel>
                  <FormControl>
                    <Input placeholder="123.456.789-00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="min-w-[85px] text-end">
                    Horário
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="123.456.789-00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="min-w-[85px] text-end">Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="R$ 100,00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="min-w-[85px] text-end">
                    Recorrência
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="R$ 100,00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
            Agendar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
