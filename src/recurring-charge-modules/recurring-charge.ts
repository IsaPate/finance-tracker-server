import { RecurringCharge } from "@prisma/client";
import {
  getAllRecurringCharges,
  updateLastGeneratedAtAndCreateTransaction,
} from "../models/recurring_charges.server";
import {
  addMonths,
  addYears,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";

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

export function getNextChargeDateAccordingToFrequency(
  charge: Pick<RecurringCharge, "lastGeneratedAt" | "startCycle" | "frequency">
) {
  const startCycle = charge.startCycle;
  const lastGeneratedAt = charge.lastGeneratedAt;
  let nextCharge = new Date(startCycle);

  const monthNumber = differenceInCalendarMonths(
    lastGeneratedAt ?? startCycle,
    startCycle
  );
  const yearNumber = differenceInCalendarYears(
    lastGeneratedAt ?? startCycle,
    startCycle
  );
  if (charge.frequency === "MONTHLY") {
    //+1 in order to get next cycle date
    nextCharge = addMonths(nextCharge, monthNumber + 1);
  } else {
    nextCharge = addYears(nextCharge, yearNumber + 1);
  }
  return nextCharge;
}

export function getUpcomingCharges(recurringCharges: RecurringCharge[]) {
  return recurringCharges.map((charge) => {
    const nextCharge = getNextChargeDateAccordingToFrequency(charge);

    const previous = new Date(nextCharge);
    previous.setDate(previous.getDate() - 1);
    return {
      ...charge,
      isUpcoming: expiredDateOrSame(new Date(), previous),
    };
  });
}

export async function scanForRecurringCharges() {
  const recurring = await getAllRecurringCharges();
  // perform db operation for each

  for (const upcoming of recurring) {
    const now = new Date();
    const nextCharge = getNextChargeDateAccordingToFrequency(upcoming);

    if (expiredDateOrSame(now, nextCharge)) {
      await updateLastGeneratedAtAndCreateTransaction(nextCharge, upcoming);
    }
  }
}
