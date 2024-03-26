import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-1982090223841625-032500-442a96da01c5b4d59a2d475363574533-131438870",
});

const payment = new Payment(client);

const test = async () => {
  payment
    .create({
      body: {
        transaction_amount: 12.34,
        description: "example description",
        payment_method_id: "pix",
        payer: {
          email: "asd@asd.com",
        },
      },
    })
    .then(console.log)
    .catch(console.log);
};

test();
