import Koa from "koa";
import dotenv from "dotenv";
import Router from "@koa/router";
import cors from "@koa/cors";
import { koaBody } from "koa-body";

dotenv.config();

const app = new Koa();
app.use(koaBody());
app.use(cors());
const router = new Router();

const PORT = process.env.PORT || 3000;

router.post("/subscription", async (ctx) => {
  const name = ctx.request.body.name;
  const cpfCnpj = ctx.request.body.cpfCnpj;

  if (!process.env.ASAAS_API_KEY) {
    throw new Error("ASAAS_API_KEY is not defined");
  }

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

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create endpoint for payment
