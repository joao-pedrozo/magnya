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
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { supabase } from "@/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export default function AddClientForm() {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="min-w-[85px] text-end">Nome</FormLabel>
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
              <FormLabel className="min-w-[85px] text-end">Nome</FormLabel>
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
              <FormLabel className="min-w-[85px] text-end">Email</FormLabel>
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
              <FormLabel className="min-w-[85px] text-end">Telefone</FormLabel>
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
              <FormLabel className="min-w-[85px] text-end">CPF</FormLabel>
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
                        !form.getValues("date") && "text-muted-foreground"
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
                          !isToday(currentDate) && currentDate < new Date()
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
              <FormLabel className="min-w-[85px] text-end">Horário</FormLabel>
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
  );
}
