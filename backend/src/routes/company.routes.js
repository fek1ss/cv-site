import { Router } from "express";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "../controllers/company.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getCompanies);
router.post("/", upload.single("icon"), createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
