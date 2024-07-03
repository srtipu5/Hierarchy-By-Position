import dotenv from "dotenv";
dotenv.config();
import { createConnection } from 'typeorm';
import { CreateEmployeeTable1632254622277 } from './createEmployeeTable';
import { log } from "../../Util/Helper";

(async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      database: process.env.DB_NAME as string,
      migrations: [CreateEmployeeTable1632254622277],
      synchronize: false,
      logging: false,
    });

    log(`Connected to DB For Table Create Migrations ... ${process.env.DB_HOST}`);

    await connection.runMigrations();
    log("Table Create Migrations ran successfully");

    await connection.close();
  } catch (error) {
    log("Migration Failed!", error);
  }
})();
