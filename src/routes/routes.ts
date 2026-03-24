import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.get(
  "/user/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    // suppose for now that name is unique

    return res.json({
      message: "welcome",
    });
  }
);

router.post("/user", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "welcome",
  });
});

router.get(
  "/user/:userId/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/user/:userId/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.get(
  "/user/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/user/:userId/category",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

export default router;
