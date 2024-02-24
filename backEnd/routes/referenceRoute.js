import express from "express";
import { getAllSatkerRef } from "../controller/referenceController.js";

const router = express.Router();

router.get("/getAllSatkerRef", getAllSatkerRef);



export default router