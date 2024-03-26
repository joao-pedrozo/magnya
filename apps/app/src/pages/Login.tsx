import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return toast({
        title: "Erro",
        description: error.message,
      });
    }

    navigate("/dashboard");
    toast({
      title: "Sucesso",
      description: "Login realizado com sucesso!",
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-12 mb-4 font-semibold">
        Bem-vindo(a) de volta!
      </h1>

      {/* <form onSubmit={handleLogin} className="flex flex-col items-center">
        <label>
          Email:
          <input type="email" name="email" className="border ml-2" />
        </label>
        <label>
          Password:
          <input type="password" name="password" className="border ml-2" />
        </label>
        <button type="submit">Login</button>
      </form> */}

      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    {...field}
                    placeholder="Seu email"
                  />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    placeholder="Sua senha"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-600 font-semibold text-md"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
