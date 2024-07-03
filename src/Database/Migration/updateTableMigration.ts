import dotenv from "dotenv";
dotenv.config();
import { createConnection } from 'typeorm';
import { InsertEmployeeData1623000000000 } from "./insertDataToEmployeeTable";

(async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      database: process.env.DB_NAME as string,
      migrations: [InsertEmployeeData1623000000000],
      synchronize: false,
      logging: false,
    });
    console.log(`Connected to DB For Data insert ... ${process.env.DB_HOST}`);

    await connection.runMigrations();
    console.log("Data insert Migrations ran successfully");

    await connection.close();
  } catch (error) {
    console.log("Migration Failed!", error);
  }
})();
