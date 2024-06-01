import express, { Request, Response } from "express";
import { promises } from "fs";
import { resolve } from "path";

const router = express.Router();
export default router;

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let myFileContent;
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

  res.send({ token: username });
});
