import { NextFunction, Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";

export const validateLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { username, password } = request.body;

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário informar campo em formato string.")
    );
  }

  if (!password || typeof password !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário informar campo em formato string.")
    );
  }
  return next();
};
