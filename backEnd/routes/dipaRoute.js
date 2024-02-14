import { getAllSpending, getAllRevenue, getAllBudget } from "../controller/dipaController.js";
import express from "express";

const router = express.Router();

router.get('/getAllSpending', getAllSpending);
router.get('/getAllRevenue', getAllRevenue);
router.get('/getAllBudget', getAllBudget);


export default router;