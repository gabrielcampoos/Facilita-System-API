import { NextFunction, Request, Response } from "express";

export const clearFields = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, username, password } = request.body;

  request.body.nome = name.trim();
  request.body.username = username.trim();
  request.body.senha = password.trim();

  return next();
};
