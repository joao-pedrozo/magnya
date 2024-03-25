import * as cron from "node-cron";
import { supabase } from "./supabase";
const twilio = require("twilio");

require("dotenv").config({ path: `../../.env.local` });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

cron.schedule("*/5 * * * * *", async () => {
  console.log("running a task every 5 seconds");

  const updateStatus = async () =>
    await supabase
      .from("appointments")
      .update({
        status: "completed",
      })
      .eq("status", "pending")
      .lte("scheduled_date", new Date().toISOString())
      .select();

  const { data } = await updateStatus();

  if (!data?.length) return;

  const billings = data.map((completedAppointment) => ({
    appointment_id: completedAppointment.appointment_id,
    amount: completedAppointment.value,
    payment_status: "pending",
  }));

  const createBillings = async () =>
    await supabase.from("billings").insert(billings);

  createBillings();
});

// Charging message task

cron.schedule("*/5 * * * * *", async () => {
  console.log("Running charging message task");

  // Find billings that have charge_message_status as pending and are older than 24 hours

  const twentyFourHoursAgo = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();

  const oneMinuteAgo = new Date(new Date().getTime() - 60 * 1000).toISOString();

  const billingsWithChargeMessageToBeSent = async () =>
    await supabase
      .from("billings")
      .select(
        `
        *,
        appointments(
          appointment_id,
          clients(*)
        )
      `
      )
      .eq("charge_message_status", "pending")
      .lte("created_at", oneMinuteAgo);

  const { data: billingsToBeCharged } =
    await billingsWithChargeMessageToBeSent();

  if (!billingsToBeCharged?.length) return;

  const sucessfulChargedAppointmentsIds: number[] = [];

  const messages = await Promise.allSettled(
    billingsToBeCharged.map(async (billingToBeCharged) => {
      try {
        await sendTwilioMessage({
          to: billingToBeCharged.appointments.clients.phone_number,
          scheduledDate: billingToBeCharged.appointments.scheduled_date,
        });

        sucessfulChargedAppointmentsIds.push(
          billingToBeCharged.appointments.appointment_id
        );
      } catch (error) {
        console.log("erro");
        console.log(error);
      }
    })
  );

  const fulfilledMessages = messages.filter(
    (message) => message.status === "fulfilled"
  );

  if (!fulfilledMessages.length) return;

  const updatedSucessfullChargedBillings = await supabase
    .from("billings")
    .update({
      charge_message_status: "sent",
    })
    .in("appointment_id", sucessfulChargedAppointmentsIds)
    .select();
});

const sendTwilioMessage = async ({
  to,
  scheduledDate,
}: {
  to: string;
  scheduledDate: Date;
}) =>
  await twilioClient.messages.create({
    body: `Olá! Espero que esteja tudo bem contigo! 😊 Estou aqui para lembrá-lo carinhosamente de que temos nossa consulta marcada para o dia X, às Y. Por favor, confirme sua presença quando puder. Estou ansiosa para vê-lo em breve!`,
    from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
    to: `whatsapp:+554198880694`,
  });
