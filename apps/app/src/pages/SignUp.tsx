import { Link, useNavigate } from "react-router-dom";
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
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export default function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;

    const { data: auth, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return toast({
        title: "Erro",
        description: error.message,
      });
    }

    await supabase.from("specialists").insert({
      username: `${data.firstName} ${data.lastName}`,
      auth_id: auth?.session?.user.id,
    });

    navigate("/dashboard");
    toast({
      title: "Sucesso",
      description: "Cadastro realizado com sucesso! Bem-vindo(a) ao sistema!",
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-12 mb-2 font-semibold">
        Crie uma conta
      </h1>

      <span className="text-center block mb-4">
        ou{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          faça login
        </Link>
      </span>

      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">Nome</FormLabel>
                  <Input
                    id="firstName"
                    type="text"
                    {...field}
                    placeholder="Seu nome"
                  />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
                  <Input
                    id="lastName"
                    type="text"
                    {...field}
                    placeholder="Seu sobrenome"
                  />
                </FormItem>
              )}
            />
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
              Criar conta
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
