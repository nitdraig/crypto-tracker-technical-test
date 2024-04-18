import { DataSource } from "typeorm";
import { Crypto } from "./models/Crypto";
import { User } from "./models/User";
export const jwtSecret: string =
  process.env.JWT_SECRET || "your_jwt_secret_here";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "prueba-orm",
  entities: [Crypto, User],
  logging: true,
  synchronize: true,
});
