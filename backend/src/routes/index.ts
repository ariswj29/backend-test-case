import express from "express";
import books from "./books.route";
import members from "./members.route";

const router = express.Router();

router.use("/api/books", books);
router.use("/api/members", members);

export default router;
