import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { Specialist } from "@/types/supabase";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const creditCardSchema = z.object({
  cardNumber: z.string().min(1),
  cardHolder: z.string().min(1),
  expirationDate: z.string().min(1),
  cvv: z.string().min(1),
});

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState<
    "personalInformation" | "paymentInformation"
  >("personalInformation");
  const [, setCreatedSpecialist] = useState<Specialist | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const creditCardForm = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
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

    const supaCreatedSpecialist = await supabase
      .from("specialists")
      .insert({
        username: `${data.firstName} ${data.lastName}`,
        auth_id: auth?.session?.user.id,
      })
      .select()
      .returns<Specialist[]>();

    if (supaCreatedSpecialist.error || !supaCreatedSpecialist.data.length) {
      return toast({
        title: "Erro",
        description: supaCreatedSpecialist.error?.message,
      });
    }

    setCurrentStep("paymentInformation");
    setCreatedSpecialist(supaCreatedSpecialist.data[0]);
  };

  const onCreditCardSubmit = async (data: z.infer<typeof creditCardSchema>) => {
    const client = await fetch(
      import.meta.env.VITE_ASAAS_API_URL + "/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: import.meta.env.VITE_ASAAS_API_KEY,
        },
        body: JSON.stringify({
          name: form.getValues("firstName") + " " + form.getValues("lastName"),
          cpfCnpj: "24971463792",
        }),
      }
    );

    try {
      const result = await fetch(
        import.meta.env.VITE_ASAAS_API_URL + "/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: import.meta.env.VITE_ASAAS_API_KEY,
          },
          body: JSON.stringify({
            customer: (await client.json()).id,
            billingType: "CREDIT_CARD",
            cycle: "MONTHLY",
            creditCard: {
              holderName: data.cardHolder,
              number: data.cardNumber,
              expiryMonth: data.expirationDate.split("/")[0],
              expiryYear: data.expirationDate.split("/")[1],
              ccv: data.cvv,
            },
            creditCardHolderInfo: {
              name:
                form.getValues("firstName") + " " + form.getValues("lastName"),
              email: form.getValues("email"),
              cpfCnpj: "24971463792",
              postalCode: "89223-005",
              addressNumber: "277",
              phone: "47999999999",
            },
            value: 99.99,
            description: "Magnya - Plano Mensal",
            // next due date: 8th of next month
            nextDueDate: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              8
            ).toISOString(),
            remoteIp: "151.169.18.181",
          }),
        }
      );

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  if (currentStep === "personalInformation")
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 font-semibold text-md mt-4"
              >
                Criar conta
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );

  if (currentStep === "paymentInformation") {
    return (
      <div>
        <h1 className="text-3xl text-center mt-12 mb-2 font-semibold">
          Informações de pagamento
        </h1>

        <div className="flex justify-center">
          <Form {...creditCardForm}>
            <form onSubmit={creditCardForm.handleSubmit(onCreditCardSubmit)}>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <FormField
                  name="cardHolder"
                  control={creditCardForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cardHolder">
                        Nome do titular
                      </FormLabel>
                      <Input
                        id="cardHolder"
                        type="text"
                        {...field}
                        placeholder="Nome do titular"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  name="cardNumber"
                  control={creditCardForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cardNumber">
                        Número do cartão
                      </FormLabel>
                      <ReactInputMask
                        mask="9999 9999 9999 9999"
                        maskChar=" "
                        {...field}
                      >
                        {/* @ts-expect-error third-party issue */}
                        {(inputProps) => (
                          <Input
                            id="cardNumber"
                            type="text"
                            {...inputProps}
                            placeholder="1234 1234 1234 1234"
                          />
                        )}
                      </ReactInputMask>
                    </FormItem>
                  )}
                />

                <FormField
                  name="expirationDate"
                  control={creditCardForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="expirationDate">
                        Data de expiração
                      </FormLabel>
                      <ReactInputMask mask="99/99" maskChar=" " {...field}>
                        {/* @ts-expect-error third-party issue */}
                        {(inputProps) => (
                          <Input
                            id="expirationDate"
                            type="text"
                            {...inputProps}
                            placeholder="MM/AA"
                          />
                        )}
                      </ReactInputMask>
                    </FormItem>
                  )}
                />

                <FormField
                  name="cvv"
                  control={creditCardForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cvv">CVV</FormLabel>
                      <ReactInputMask mask="999" maskChar=" " {...field}>
                        {/* @ts-expect-error third-party issue */}
                        {(inputProps) => (
                          <Input
                            id="cvv"
                            type="text"
                            {...inputProps}
                            placeholder="123"
                          />
                        )}
                      </ReactInputMask>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-600 font-semibold text-md mt-4"
              >
                Criar conta
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
}
