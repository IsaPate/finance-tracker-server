import cron from "node-cron";
import { app } from "./app";
import { logger } from "./lib/logger";
import { scanForEmailReporting } from "./email-reporting-modules/email-reporting";
import { scanForRecurringCharges } from "./recurring-charge-modules/recurring-charge";

const port = process.env.PORT || 3000;

cron.schedule("30 10 1 * *", async () => {
  try {
    await scanForEmailReporting();
  } catch (error) {
    logger.error(error);
  }
});

cron.schedule("* * * * *", async () => {
  try {
    await scanForRecurringCharges();
  } catch (error) {
    logger.error(error);
  }
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
