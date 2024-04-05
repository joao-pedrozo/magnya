import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import ReactInput from "react-input-mask";

const formSchema = z.object({
  cpf: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  value: z.string().min(1),
});

interface RescheduleFormProps {
  clientCpf: string;
  date: string;
  time: string;
  value: number;
  appointmentId: number;
  setIsFormOpen: (state: boolean) => void;
}

const parseCurrency = (value: string) => {
  const rawValue = value.split("R$")[1];
  const trimmedRawValue = rawValue.trim();

  return Number.parseFloat(trimmedRawValue.replace(",", "."));
};

export default function RescheduleForm({
  clientCpf,
  date,
  time,
  value,
  appointmentId,
  setIsFormOpen,
}: RescheduleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: clientCpf,
      date,
      time: time,
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value),
    },
  });

  const rescheduleMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const day = new Date(values.date).getDate();
      const month = new Date(values.date).getMonth();
      const year = new Date(values.date).getFullYear();
      const hours = Number.parseInt(values.time.split(":")[0]);
      const minutes = Number.parseInt(values.time.split(":")[1]);

      return supabase
        .from("appointments")
        .update({
          scheduled_date: new Date(year, month, day, hours, minutes),
          value: parseCurrency(values.value),
        })
        .eq("appointment_id", appointmentId);
    },
  });

  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof formSchema>) {
    rescheduleMutation.mutate(values, {
      onSuccess: () => {
        alert("Agendamento reagendado com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
        setIsFormOpen(false);
      },
      onError: (error) => alert(error.message),
    });
  }

  const anyValueHasChanged = () => {
    const values = form.getValues();

    return (
      values.date !== date ||
      values.time !== time ||
      parseCurrency(values.value) !== value
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel htmlFor="cpf">CPF do cliente</FormLabel>
          <FormControl>
            <FormField
              control={form.control}
              name="cpf"
              shouldUnregister
              render={({ field }) => (
                <ReactInputMask
                  {...field}
                  mask="999.999.999-99"
                  disabled
                  maskChar={null}
                >
                  {/* @ts-expect-error third-party issue */}
                  {(props) => <Input {...props} disabled />}
                </ReactInputMask>
              )}
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormControl>
            <FormField
              control={form.control}
              name="date"
              render={() => (
                <FormItem className="flex justify-start items-start gap-1 flex-col">
                  <FormLabel className="text-end text-nowrap">
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
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="time">Hora</FormLabel>
          <FormControl>
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="value">Valor</FormLabel>
          <FormControl>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
        </FormItem>
        <Button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800"
          disabled={!anyValueHasChanged()}
        >
          Reagendar
        </Button>
      </form>
    </Form>
  );
}
