import { getAllSpending, getAllSpendingBudget } from "../controller/dipaController.js";
import express from "express";

const router = express.Router();

router.get('/getAllSpending', getAllSpending);
router.get('/getAllSpendingBudget', getAllSpendingBudget);


export default router;