import * as cron from "node-cron";

cron.schedule("* * * * *", () => {
  console.log("Running appointment verification job...");
  // Your verification logic here
});
