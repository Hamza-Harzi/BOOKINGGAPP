// pour l'aithentification nous allons utiliser a spesific router
import express from "express";
import { Login, regester } from "../controllers/authController.js";
const router = express.Router();

router.post("/regester", regester);
router.post("/Login", Login);

export default router;
