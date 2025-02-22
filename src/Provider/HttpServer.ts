import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import ApiController from "../Controller/ApiController";
import { AppError, handleError } from '../Util/Exception'

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use("/api", new ApiController().register());

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res)
})

export default app;
