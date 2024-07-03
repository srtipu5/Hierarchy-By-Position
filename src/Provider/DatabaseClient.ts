import { createConnection } from "typeorm";
import { EmployeeModel } from "../Database/Model/Employee";

let connection: any;
export default {
  async connect() {
    try {
      connection = await createConnection({
        type: "postgres",
        host: process.env.DB_HOST as string,
        port: +process.env.DB_PORT!,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASS as string,
        database: process.env.DB_NAME as string,
        entities: [EmployeeModel],
        synchronize: false,
        logging: false,
      });
      console.log(`Connected to DB ... ${process.env.DB_HOST}`);
    } catch (error) {
      console.log("DB Connection Failed !", error);
    }
  },

  async close() {
    try {
      await connection.close();
      console.log("DB Connection Closed.");
    } catch (error) {
      console.log("Failed to close DB connection", error);
    }
  },
};
