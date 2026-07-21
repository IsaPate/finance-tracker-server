import { app } from "./app";
import { logger } from "./lib/logger";
import { getUsersWithEnabledReporting } from "./models/user.server";
import PQueue from "p-queue";
import { emailReporting } from "./email-reporting/email-reporting";

const port = process.env.PORT || 3000;

const pQueue = new PQueue({ concurrency: 2 });

async function scanForEmailReporting() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const users = await getUsersWithEnabledReporting();
  for (const user of users) {
    pQueue.add(async () => {
      try {
        await emailReporting(user.email, {
          start,
          end,
        });
      } catch (err) {
        logger.error(
          { email: user.email, err },
          "failed to send monthly report"
        );
      }
    });
  }
}
(async () => {
  await scanForEmailReporting();
})();

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
