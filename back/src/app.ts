import express from "express";
import bodyParser from "body-parser";
import authRoutes from "../src/routes/authRoutes";
import cryptoRoutes from "../src/routes/cryptoRoutes";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/crypto", cryptoRoutes);
export default app;
