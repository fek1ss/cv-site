import { Router } from "express";
import { getContacts, createContact, updateContact, deleteContact } from "../controllers/contact.controller.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/", getContacts);
router.post("/",upload.single("icon"), createContact);
router.patch("/:id", upload.single("icon"), updateContact);
router.delete("/:id", deleteContact);

export default router;
