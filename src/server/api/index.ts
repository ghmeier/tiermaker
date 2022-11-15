import { Router } from "express";
import rankings from "./rankings";
const router = Router();

router.use("/rankings", rankings);

export default router;
