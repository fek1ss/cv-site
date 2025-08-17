import { Router } from "express";
import { getHeroes, createHero, updateHero, deleteHero } from "../controllers/hero.controller.js";

const router = Router();

router.get("/", getHeroes);
router.post("/", createHero);
router.put("/:id", updateHero);
router.delete("/:id", deleteHero);

export default router;
