import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.get("/user", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "welcome",
  });
});

router.post("/user", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "welcome",
  });
});

router.get(
  "/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.post(
  "/transaction",
  (req: Request, res: Response, next: NextFunction) => {
    return res.json({
      message: "welcome",
    });
  }
);

router.get("/category", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "welcome",
  });
});

router.post("/category", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "welcome",
  });
});

export default router;
