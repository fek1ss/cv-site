import { Router } from "express";
import { getEducations, createEducation, updateEducation, deleteEducation } from "../controllers/education.controller.js";

const router = Router();

router.get("/", getEducations);
router.post("/", createEducation);
router.patch("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;
