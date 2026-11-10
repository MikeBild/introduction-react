import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import * as http from "http";
import login from "./routes/login";
import profiles from "./routes/profiles";
import todos from "./routes/todos";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/login", login);
app.use("/profiles", profiles);
app.use("/todos", todos);

app.get("/", (req: Request, res: Response) => {
  res.send("Todos API");
});

export async function start(port?: number): Promise<http.Server> {
  return new Promise((resolve) => {
    const server: http.Server = app.listen(port, () => resolve(server));
  });
}

export async function stop(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.closeAllConnections();
    resolve();
  });
}
