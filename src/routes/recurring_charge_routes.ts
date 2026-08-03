import { Router } from "express";

const recurringChargesRouter = Router();

recurringChargesRouter.get("/users/:userId/recurring-charges");
recurringChargesRouter.post("/users/:userId/recurring-charges");
recurringChargesRouter.put("/users/:userId/recurring-charges");
recurringChargesRouter.delete("/users/:userId/recurring-charges");

export default recurringChargesRouter;
