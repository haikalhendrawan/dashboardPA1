import express from "express";
import { getLastUpdateHistory } from "../controller/historyController.js";

const router = express.Router();

router.get("/getLastUpdateHistory", getLastUpdateHistory);

export default router;