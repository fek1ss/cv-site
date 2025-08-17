// backend/src/routes/position.routes.js
import { Router } from "express";
import { getPositions, createPosition, updatePosition, deletePosition } from "../controllers/position.controller.js";

const router = Router();

router.get("/", getPositions);
router.post("/", createPosition);
router.put("/:id", updatePosition);
router.delete("/:id", deletePosition);

export default router;
