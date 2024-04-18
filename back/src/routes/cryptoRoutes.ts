import express from "express";
import {
  createCrypto,
  getAllCryptos,
  updateCrypto,
  deleteCrypto,
} from "../controllers/cryptoController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/new", verifyToken, createCrypto);

router.get("/get", verifyToken, getAllCryptos);

router.put("/mycrypto/:id", verifyToken, updateCrypto);

router.delete("/mycrypto/:id", verifyToken, deleteCrypto);

export default router;
