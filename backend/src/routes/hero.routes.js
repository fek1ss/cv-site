import { Router } from "express";
import { getHeroes, createHero, updateHero, deleteHero } from "../controllers/hero.controller.js";
import upload  from '../middleware/upload.js';

const router = Router();

router.get("/", getHeroes);
router.post("/", createHero);
router.patch("/:id", upload.single("photo"), updateHero);
router.delete("/:id", deleteHero);

export default router;
