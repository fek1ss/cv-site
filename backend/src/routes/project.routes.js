import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), createProject);
router.patch("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;