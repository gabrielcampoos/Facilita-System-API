import { NextFunction, Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";

export const validateNewUserFields = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, username, password } = request.body;

  if (!name || typeof name !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário informar um nome em formato string.")
    );
  }

  if (!username || typeof username !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário informa username em formato string.")
    );
  }

  if (!password || typeof password !== "string") {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "É necessário informar senha em formato string")
    );
  }

  if (password.length < 6) {
    return httpHelper.badRequestError(
      response,
      Result.error(400, "A senha deve conter pelo menos 6 caracteres.")
    );
  }
  return next();
};
