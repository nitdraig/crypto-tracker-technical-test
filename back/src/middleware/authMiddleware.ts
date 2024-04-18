import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as db from "../db";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    jwt.verify(token, db.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token", err });
      } else {
        (req as any).user = decoded;
        next();
      }
    });
  }
};
