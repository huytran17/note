import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";

import appRouter from "./routes";

import { createDirIfNotExists } from "./utils";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(appRouter);

app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Server listening on port: ${process.env.SERVER_PORT}`);
  await createDirIfNotExists();
});
