import { RecurringCharge } from "@prisma/client";
import {
  getAllRecurringCharges,
  updateLastGeneratedAtAndCreateTransaction,
} from "../models/recurring_charges.server";

export function compareDates(now: Date, start: Date) {
  now.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return now.getTime() === start.getTime();
}

export function expiredDateOrSame(now: Date, nextChargeDate: Date) {
  now.setHours(0, 0, 0, 0);
  nextChargeDate.setHours(0, 0, 0, 0);
  return now.getTime() >= nextChargeDate.getTime();
}

export function getUpcomingCharges(recurringCharges: RecurringCharge[]) {
  const now = new Date();

  return recurringCharges.map((charge) => {
    //check from client if now < start cycle?
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

export async function scanForRecurringCharges() {
  const recurring = await getAllRecurringCharges();
  // perform db operation for each

  for (const upcoming of recurring) {
    const now = new Date();
    const anchor = upcoming.lastGeneratedAt ?? upcoming.startCycle;

    const nextCharge = new Date(anchor);

    if (upcoming.frequency === "MONTHLY") {
      nextCharge.setMonth(nextCharge.getMonth() + 1);
    } else {
      nextCharge.setFullYear(nextCharge.getFullYear() + 1);
    }

    if (expiredDateOrSame(now, nextCharge)) {
      await updateLastGeneratedAtAndCreateTransaction(nextCharge, upcoming);
    }
  }
}
