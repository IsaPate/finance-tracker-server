import { RecurringCharge } from "@prisma/client";

export function compareDates(now: Date, start: Date) {
  now.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return now.getTime() === start.getTime();
}

export function getUpcomingCharges(recurringCharges: RecurringCharge[]) {
  const now = new Date();

  return recurringCharges.map((charge) => {
    const anchor = charge.lastGeneratedAt ?? charge.startCycle;
    const startOrLastGenerated = new Date(anchor);

    if (charge.frequency === "MONTHLY") {
      startOrLastGenerated.setMonth(startOrLastGenerated.getMonth() + 1);
    } else {
      startOrLastGenerated.setFullYear(startOrLastGenerated.getFullYear() + 1);
    }

    const previous = new Date(startOrLastGenerated);
    previous.setDate(previous.getDate() - 1);
    return {
      ...charge,
      isUpcoming:
        compareDates(now, startOrLastGenerated) || compareDates(now, previous),
    };
  });
}
