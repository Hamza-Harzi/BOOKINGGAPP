import express from "express";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
import {
  countByCity,
  countByType,
  createHolel,
  deleteHolel,
  getHolel,
  getHolels,
  updateHolel,
} from "../controllers/hotelController.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHolel);
//UPDATE
router.put("/:id", verifyAdmin, updateHolel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHolel);
//GET
// add /find por eviter ce error"Cast to ObjectId failed for  value \"countByCity\" (type string) at path \"_id\" for model \"Hotel\"
router.get("/find/:id", getHolel); //tout le monde peut avoir un hotel donc se pour ca je mettre pas ici verifyAdmin
//GET ALL
router.get("/", getHolels); //tout le monde peut avoir un hotel donc se pour ca je mettre pas ici verifyAdmin
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
export default router;
