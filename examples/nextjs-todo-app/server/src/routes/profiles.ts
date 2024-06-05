import express, { Request, Response } from "express";
import { promises } from "fs";
import { resolve } from "path";

const router = express.Router();
export default router;

router.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const myProfileJson = (
      await promises.readFile(`${resolve()}/data/${username}.json`)
    ).toString();
    res.send(JSON.parse(myProfileJson).profile || {});
  } catch {
    return res.status(500);
  }
});

router.post("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const { firstName, lastName } = req.body;
  try {
    const myFile = (
      await promises.readFile(`${resolve()}/data/${username}.json`)
    ).toString();
    const myFileContent = JSON.parse(myFile);

    await promises.writeFile(
      `${resolve()}/data/${username}.json`,
      JSON.stringify(
        { ...myFileContent, profile: { firstName, lastName } },
        null,
        4
      )
    );
    res.send({ username, firstName, lastName });
  } catch {
    return res.status(500);
  }
});
