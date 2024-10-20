import express from "express";
import { getMembers } from "../controllers/members.controller";

const router = express.Router();

router.get("/", getMembers);

export default router;
