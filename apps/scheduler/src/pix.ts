import { MercadoPagoConfig, Payment } from "mercadopago";

interface GeneratePixProps {
  amount: number;
  customerEmail: string;
}

require("dotenv").config({ path: `../../.env.local` });

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const payment = new Payment(client);

const generatePix = async ({ amount, customerEmail }: GeneratePixProps) => {
  const pix = await payment.create({
    body: {
      transaction_amount: amount,
      payment_method_id: "pix",
      payer: {
        email: customerEmail,
      },
    },
  });

  if (!pix.point_of_interaction?.transaction_data) {
    throw new Error("Could not generate pix");
  }

  return {
    qrCode: pix.point_of_interaction.transaction_data.qr_code!,
    qrCodeBase64: pix.point_of_interaction.transaction_data.qr_code_base64!,
  };
};

export default generatePix;
