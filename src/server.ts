import cors from "cors";
import type { Request, Response } from "express";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello-world", async (req: Request, res: Response) => {
  res.status(200).json({
    data: "Hello World!",
  });
});

export default app;
