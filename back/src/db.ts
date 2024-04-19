import { DataSource } from "typeorm";
import { Crypto } from "./models/Crypto";
import { User } from "./models/User";
export const jwtSecret: string =
  process.env.JWT_SECRET ||
  "cd500e20f363915775ace4a8668d02f81bead780a8109510941300a42872937f";
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
