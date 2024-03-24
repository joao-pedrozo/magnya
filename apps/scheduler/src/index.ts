import * as cron from "node-cron";
import { supabase } from "./supabase";

require("dotenv").config({ path: `../../.env.local` });

console.log(process.env.SUPABASE_PROJECT_URL);

// Run every 5 seconds
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

  const { count } = await updateStatus();

  console.log(`${count} updated`);
});
