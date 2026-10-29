import express, { Request, Response } from "express";
import { promises } from "fs";
import { resolve } from "path";

const router = express.Router();
export default router;

router.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const myTodosJson = (
      await promises.readFile(`${resolve()}/data/${username}.json`)
    ).toString();

    res.send(JSON.parse(myTodosJson).todos);
  } catch {
    return res.status(500);
  }
});

router.patch("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const { description, state } = req.body;
  try {
    const myFile = (
      await promises.readFile(`${resolve()}/data/${username}.json`)
    ).toString();
    const myFileContent = JSON.parse(myFile);

    await promises.writeFile(
      `${resolve()}/data/${username}.json`,
      JSON.stringify(
        {
          ...myFileContent,
          todos: { ...myFileContent.todos, [`${description}`]: state },
        },
        null,
        4
      )
    );
    res.send({ description, state });
  } catch {
    return res.status(500);
  }
});
