import { Request, Response } from "express";

const getCurrentUser = (req: Request, res: Response) => {
  const user = req.user;

  res.json(user);
};
