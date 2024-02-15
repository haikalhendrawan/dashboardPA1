import { getAllSpending, getAllRevenue, getAllBudget, addAllBudget } from "../controller/dipaController.js";
import express from "express";

const router = express.Router();

router.get('/getAllSpending', getAllSpending);
router.get('/getAllRevenue', getAllRevenue);
router.get('/getAllBudget', getAllBudget);
router.post('/addAllBudget', addAllBudget);


export default router;