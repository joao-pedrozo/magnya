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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, CheckIcon, ChevronDown } from "lucide-react";
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

import {
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";
import ReactInputMask from "react-input-mask";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email(),
  phone: z.string().min(1),
  CPF: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  recurrency: z.string().min(1),
});

const languages = [
  { label: "Semanal", value: "weekly" },
  { label: "Quinzenal", value: "biweekly" },
  { label: "Único", value: "one-time" },
] as const;

interface AddClientFormProps {
  setIsFormDialogOpen: (state: boolean) => void;
}

export default function AddClientForm({
  setIsFormDialogOpen,
}: AddClientFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { specialist } = useAuth();

  const clientMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const { data: results } = await supabase
        .from("clients")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          cpf: data.CPF,
          specialist_id: specialist?.id,
        })
        .select();

      if (!results?.length) return;

      await supabase.from("appointment_recurrency").insert({
        client_id: results[0].id,
        specialist_id: specialist?.id,
        recurrency: data.recurrency,
      });

      const year = new Date(data.date).getFullYear();
      const month = new Date(data.date).getMonth();
      const day = new Date(data.date).getDate();
      const hours = Number(data.time.split(":")[0]);
      const minutes = Number(data.time.split(":")[1]);

      await supabase.from("appointments").insert({
        client_id: results[0].id,
        specialist_id: specialist?.id,
        scheduled_date: new Date(year, month, day, hours, minutes),
        value: 100,
      });
    },
    onSuccess: () => {
      toast({
        title: "Cliente adicionado com sucesso!",
        description: "O cliente foi adicionado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setIsFormDialogOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    clientMutation.mutate(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toDateString(),
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      CPF: "",
      time: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="text-end">Nome</FormLabel>
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
              <FormLabel className="text-end">Sobrenome</FormLabel>
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
              <FormLabel className="text-end">Email</FormLabel>
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
              <FormLabel className="text-end">Telefone</FormLabel>
              <FormControl>
                <ReactInputMask
                  mask="(99) 9 9999-9999"
                  maskChar={null}
                  {...field}
                >
                  {/* @ts-expect-error third-party issue */}
                  {(inputProps) => <Input {...inputProps} />}
                </ReactInputMask>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CPF"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="text-end">CPF</FormLabel>
              <FormControl>
                <ReactInputMask
                  mask="999.999.999-99"
                  placeholder="123.456.789-00"
                  maskChar={null}
                  {...field}
                >
                  {/* @ts-expect-error third-party issue */}
                  {(inputProps) => <Input {...inputProps} />}
                </ReactInputMask>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={() => (
            <FormItem className="flex items-center gap-3">
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
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="text-end">Horário</FormLabel>
              <FormControl>
                <ReactInputMask mask="99:99" maskChar={null} {...field}>
                  {/* @ts-expect-error third-party issue */}
                  {(inputProps) => <Input {...inputProps} />}
                </ReactInputMask>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recurrency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Recorrência</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[230px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Selecione a recorrência"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("recurrency", language.value);
                            }}
                          >
                            {language.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
