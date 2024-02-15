import { getAllSpending, getAllRevenue, getAllBudget, addBudget } from "../controller/dipaController.js";
import express from "express";

const router = express.Router();

router.get('/getAllSpending', getAllSpending);
router.get('/getAllRevenue', getAllRevenue);
router.get('/getAllBudget', getAllBudget);
router.post('/addBudget', addBudget);


export default router;