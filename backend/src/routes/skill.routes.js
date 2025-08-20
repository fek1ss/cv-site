import { Router } from "express";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../controllers/skill.controller.js";
import upload from '../middleware/upload.js';

const router = Router();

router.get("/", getSkills);
router.post("/", upload.single("icon"), createSkill);
router.patch("/:id", upload.single("icon"), updateSkill);
router.delete("/:id", deleteSkill);

export default router;
