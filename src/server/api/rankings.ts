import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.get("/:id", async (req, res) => {
  res.status(200);
  res.json({});
});

export default router;
