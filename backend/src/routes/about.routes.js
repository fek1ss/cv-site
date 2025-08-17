import { Router } from "express";
import { getAbout, createAbout, updateAbout, deleteAbout } from "../controllers/about.controller.js";

const router = Router();

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

export default router;
