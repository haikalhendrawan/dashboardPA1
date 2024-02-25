import { getAllSpending, getAllRevenue, getAllBudget, addAllSpending, addAllBudget, getAllSpending50 } from "../controller/dipaController.js";
import express from "express";

const router = express.Router();

router.get('/getAllSpending', getAllSpending);
router.get('/getAllRevenue', getAllRevenue);
router.get('/getAllBudget', getAllBudget);
router.get('/getAllSpending50', getAllSpending50);

router.post('/addAllSpending', addAllSpending);
router.post('/addAllBudget', addAllBudget);


export default router;