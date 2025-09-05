import { Router } from "express";
import { getBooks, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;