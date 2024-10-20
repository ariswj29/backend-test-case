import express from "express";
import {
  getBooks,
  borrowBook,
  returnBook,
} from "../controllers/books.controller";

const router = express.Router();

router.get("/", getBooks);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);

export default router;
