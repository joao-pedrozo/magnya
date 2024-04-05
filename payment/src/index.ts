import Koa from "koa";
import dotenv from "dotenv";
import Router from "@koa/router";
import cors from "@koa/cors";
import { koaBody } from "koa-body";
import { supabase } from "./supabase";

dotenv.config();

const app = new Koa();
app.use(koaBody());
app.use(cors());
const router = new Router();

const PORT = process.env.PORT || 3000;

router.post("/customer", async (ctx) => {
  if (!process.env.ASAAS_API_KEY) {
    throw new Error("ASAAS_API_KEY is not defined");
  }

  const { name, cpfCnpj } = ctx.request.body;

  const customer = await fetch("https://sandbox.asaas.com/api/v3/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      access_token: process.env.ASAAS_API_KEY,
    },
    body: JSON.stringify({
      name,
      cpfCnpj,
    }),
  });

  const customerJson = await customer.json();

  ctx.response.body = customerJson;
});

router.post("/subscription", async (ctx) => {
  const name = ctx.request.body.name;
  const cpfCnpj = ctx.request.body.cpfCnpj;

  if (!process.env.ASAAS_API_KEY) {
    throw new Error("ASAAS_API_KEY is not defined");
  }

  const customer = await fetch("http://localhost:3000/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      access_token: process.env.ASAAS_API_KEY,
    },
    body: JSON.stringify({ name, cpfCnpj }),
  });

  const { id: customerId } = await customer.json();

  const TODAY = new Date();

  const subscription = await fetch(
    "https://sandbox.asaas.com/api/v3/subscriptions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: process.env.ASAAS_API_KEY,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: "PIX",
        value: 100,
        cycle: "MONTHLY",
        description: "Assinatura mensal Magnya",
        nextDueDate: TODAY,
      }),
    }
  );

  const subscriptionJson = await subscription.json();

  console.log(subscriptionJson);

  ctx.response.body = subscriptionJson;
});

router.get("/subscriptions/payments/current/:id", async (ctx) => {
  const { id } = ctx.params;

  if (!process.env.ASAAS_API_KEY) {
    throw new Error("ASAAS_API_KEY is not defined");
  }

  const subscription = await fetch(
    `https://sandbox.asaas.com/api/v3/subscriptions/${id}/payments`,
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY,
      },
    }
  );

  const { data: subscriptionPayments } = await subscription.json();

  const lastCharge = subscriptionPayments[subscriptionPayments.length - 1];
  const lastChargeId = lastCharge.id;

  const payment = await fetch(
    `https://sandbox.asaas.com/api/v3/payments/${lastChargeId}/pixQrCode`,
    {
      headers: {
        access_token: process.env.ASAAS_API_KEY,
      },
    }
  );

  const paymentJson = await payment.json();

  ctx.response.body = paymentJson;
});

router.post("/webhook/payment", async (ctx) => {
  const {
    event,
    payment: { customer: customerId },
  } = ctx.request.body;

  if (event !== "PAYMENT_RECEIVED") {
    ctx.response.status = 200;
    return;
  }

  console.log("PROCESSING + " + event, customerId);

  const { data: specialist } = await supabase
    .from("specialists")
    .select()
    .eq("payment_provider_customer_id", customerId)
    .single();

  if (specialist.error) {
    ctx.throw(404, specialist.error.message);
  }

  const specialistSubscription = await supabase
    .from("specialists_subscriptions")
    .update({
      status: "paid",
    })
    .eq("specialist_id", specialist.id)
    .single();

  if (specialistSubscription.error) {
    console.log(specialistSubscription.error);
    ctx.throw(400, specialistSubscription.error.message);
  }

  return (ctx.response.status = 200);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
