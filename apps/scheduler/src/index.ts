import * as cron from "node-cron";
import { supabase } from "./supabase";

require("dotenv").config({ path: `../../.env.local` });

console.log(process.env.SUPABASE_PROJECT_URL);

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
