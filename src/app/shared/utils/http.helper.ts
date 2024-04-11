import { Response } from "express";
import { ResultDTO } from "./result.helper";

class HttpHelper {
  public success(res: Response, resultado: ResultDTO) {
    return res.status(resultado.code ?? 200).send(resultado);
  }

  public serverError(res: Response, resultado: ResultDTO) {
    return res.status(resultado.code ?? 500).send(resultado);
  }

  public badRequestError(res: Response, resultado: ResultDTO) {
    return res.status(resultado.code ?? 400).send(resultado);
  }
}

export const httpHelper = new HttpHelper();
