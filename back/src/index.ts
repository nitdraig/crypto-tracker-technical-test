import app from "./app";
import "reflect-metadata";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Data Base connected");
    app.listen(5000);
    console.log("hola esta andando en ", 5000);
  } catch (error) {
    console.error(error);
  }
}

main();
