import "module-alias/register";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import "@/database/connection";
import routes from "@/routes";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Configurando o diretório de arquivos estáticos
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get("/", (request: Request, response: Response) => {
  const indexPath = path.join(__dirname, "../index.html");
  return response.sendFile(indexPath);
});

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
