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

const formSchema = z.object({
  cpf: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  value: z.number().min(1),
});

export default function RescheduleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel htmlFor="cpf">CPF do cliente</FormLabel>
          <FormControl>
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="date">Data</FormLabel>
          <FormControl>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => <Input {...field} />}
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
        <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
          Reagendar
        </Button>
      </form>
    </Form>
  );
}
