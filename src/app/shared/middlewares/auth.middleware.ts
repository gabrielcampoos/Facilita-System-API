import { NextFunction, Request, Response } from "express";
import { Result, httpHelper, jwt } from "../utils";

export const auth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.headers;

  if (!token) {
    return httpHelper.badRequestError(
      response,
      Result.error(401, "Token inválido.")
    );
  }

  try {
    const user = jwt.decoded(token as string);
    request.user = user;
    return next();
  } catch (erro: any) {
    return httpHelper.badRequestError(
      response,
      Result.error(401, erro.toString())
    );
  }
};
