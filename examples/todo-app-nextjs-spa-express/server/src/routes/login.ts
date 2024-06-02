import express, { Request, Response } from "express";
import { promises } from "fs";
import { resolve } from "path";
import { delay } from "../lib/utils";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  await delay(5000);
  
  const { username, password } = req.body;
  let myFileContent;

  if (password !== "password") {
    return res.status(400).send({ errorMessage: "Wrong password!" });
  }

  try {
    const myFile = (
      await promises.readFile(`${resolve()}/data/${username}.json`)
    ).toString();
    myFileContent = JSON.parse(myFile);
  } catch {}

  await promises.writeFile(
    `${resolve()}/data/${username}.json`,
    JSON.stringify(
      {
        ...myFileContent,
        username,
      },
      null,
      4
    )
  );
  
  res.send({ username, token: username });
});
