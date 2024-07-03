import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import server from "./Provider/HttpServer";
import database from "./Provider/DatabaseClient";

server.listen(process.env.HTTP_PORT, async () => {
  await database.connect()
  // await redis.connect()
  console.log(
    `[server]: Server is running at http://localhost:${process.env.HTTP_PORT}`
  );
});
