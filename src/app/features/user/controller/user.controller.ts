import { Request, Response } from "express";
import { Result, httpHelper } from "../../../shared/utils";
import { CreateUserDTO } from "../dtos";
import {
  CreateUserUsecase,
  ListAllUsersUsecase,
  LoginUserUsecase,
} from "../usecases";
import { GetUserUsercase } from "../usecases/get-user.usecase";

export class UserController {
  static async createUser(request: Request, response: Response) {
    const user: CreateUserDTO = request.body;

    try {
      const usecase = new CreateUserUsecase();

      const result = await usecase.execute(user);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async loginUser(request: Request, response: Response) {
    const { username, password }: CreateUserDTO = request.body;

    try {
      const usecase = new LoginUserUsecase();

      const result = await usecase.execute({ username, password });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listUsers(request: Request, response: Response) {
    try {
      const usecase = new ListAllUsersUsecase();

      const result = await usecase.execute();

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async getUser(request: Request, response: Response) {
    try {
      const { username } = request.user;

      const usecase = new GetUserUsercase();

      const result = await usecase.execute(username);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
