import { Router } from "express";
import { isSelfUser, verifyTokenMiddleware } from "../middlewares/auth";
import { asyncHandler } from "../middlewares/handlers";
import {
  getUserRecurringCharges,
  createUserRecurringCharges,
  getSingleRecurringCharge,
  deleteRecurringCharge,
  editRecurringCharge,
  cancelRecurringCharge,
} from "../controllers/recurring_charge_controller";
import { validationMiddleware } from "../middlewares/validate";
import {
  editRecurringChargeSchema,
  recurringChargeSchema,
} from "../schemas/recurring_charge_schema";

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
  validationMiddleware(recurringChargeSchema),
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
  validationMiddleware(editRecurringChargeSchema),
  asyncHandler(editRecurringCharge)
);
recurringChargesRouter.delete(
  "/users/:userId/recurring-charges/:recurringChargeId",
  verifyTokenMiddleware,
  isSelfUser,
  asyncHandler(deleteRecurringCharge)
);

recurringChargesRouter.patch(
  "/users/:userId/recurring-charges/:recurringChargeId/cancel",
  verifyTokenMiddleware,
  isSelfUser,
  // validationMiddleware(editRecurringChargeSchema),
  asyncHandler(cancelRecurringCharge)
);
export default recurringChargesRouter;
