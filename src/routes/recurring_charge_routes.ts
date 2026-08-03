import { Router } from "express";
import { isSelfUser, verifyTokenMiddleware } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/handlers";
import {
  getUserRecurringCharges,
  createUserRecurringCharges,
  getSingleRecurringCharge,
  deleteRecurringCharge,
  editRecurringCharge,
} from "../controllers/recurring_charge_controller";

const recurringChargesRouter = Router();

recurringChargesRouter.get(
  "/users/:userId/recurring-charges",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getUserRecurringCharges)
);
recurringChargesRouter.post(
  "/users/:userId/recurring-charges",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(createUserRecurringCharges)
);

recurringChargesRouter.get(
  "/users/:userId/recurring-charges/:recurringChargeId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(getSingleRecurringCharge)
);

recurringChargesRouter.patch(
  "/users/:userId/recurring-charges/:recurringChargeId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(editRecurringCharge)
);
recurringChargesRouter.delete(
  "/users/:userId/recurring-charges/:recurringChargeId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(deleteRecurringCharge)
);

export default recurringChargesRouter;
