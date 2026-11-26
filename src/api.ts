import { Router } from "express";
import { userRouter } from "./routes/user_routes";
import { transactionRouter } from "./routes/transaction_routes";
import { categoryRouter } from "./routes/category_routes";
import { authRouter } from "./routes/auth_routes";
import recurringChargesRouter from "./routes/recurring_charge_routes";
import { adminRouter } from "./routes/admin_routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use(recurringChargesRouter);
apiRouter.use(userRouter);
apiRouter.use(transactionRouter);
apiRouter.use(categoryRouter);
apiRouter.use(adminRouter);

export default apiRouter;
