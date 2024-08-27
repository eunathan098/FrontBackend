import "module-alias/register";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import "@/database/connection";
import routes from "@/routes";
import path from "path";

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (request: Request, response: Response) => {
  const indexPath = path.join(__dirname, "../index.html");
  return response.sendFile(indexPath);
});

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server running in port  ${PORT}`);
});