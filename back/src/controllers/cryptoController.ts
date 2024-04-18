import { Request, Response } from "express";
import { Crypto } from "../models/Crypto";

export const createCrypto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, ticker, purchasePrice, quantity } = req.body;

    const crypto = Crypto.create({ name, ticker, purchasePrice, quantity });
    await crypto.save();

    res.status(201).json({ message: "Crypto created successfully", crypto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCryptos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateCrypto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, ticker, purchasePrice, quantity } = req.body;

    const crypto = await Crypto.findOne({ where: { id: parseInt(id) } });

    if (!crypto) {
      return res.status(404).json({ error: "Crypto not found" });
    }

    crypto.name = name;
    crypto.ticker = ticker;
    crypto.purchasePrice = purchasePrice;
    crypto.quantity = quantity;

    await crypto.save();

    res.json({ message: "Crypto updated successfully", crypto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCrypto = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const crypto = await Crypto.findOne({ where: { id: parseInt(id) } });

    if (!crypto) {
      return res.status(404).json({ error: "Crypto not found" });
    }
    await crypto.remove();

    res.json({ message: "Crypto deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
