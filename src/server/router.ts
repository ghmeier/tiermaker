import {
  Router,
  Request,
  RequestHandler,
  Response,
  NextFunction,
} from "express";

const router = Router();

const asyncMiddleware = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

import api from "./api";
router.use("/api", asyncMiddleware(api));

export default router;
