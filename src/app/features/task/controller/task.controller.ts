import { Request, Response } from "express";
import {
  CreateTaskUsecase,
  DeleteTaskUsecase,
  EditTaskUsecase,
  ListTasksUsecase,
} from "../usecases";
import { Result, httpHelper } from "../../../shared/utils";

export class TaskController {
  static async createTask(request: Request, response: Response) {
    const { title, task, author } = request.body;

    try {
      const usecase = new CreateTaskUsecase();

      const result = await usecase.execute({ title, task, author });

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async listTasks(request: Request, response: Response) {
    const { username } = request.user;

    try {
      const usecase = new ListTasksUsecase();

      const result = await usecase.execute(username);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async editTask(request: Request, response: Response) {
    const { id } = request.params;
    const { username, title, task, createdAt } = request.body;

    try {
      const usecase = new EditTaskUsecase();

      const result = await usecase.execute({
        id,
        username,
        newData: {
          title,
          task,
          createdAt,
        },
      });

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }

  static async deleteTask(request: Request, response: Response) {
    const { id } = request.params;
    const { username } = request.body;

    try {
      const usecase = new DeleteTaskUsecase();

      const result = await usecase.execute(id, username);

      if (!result.success) return httpHelper.badRequestError(response, result);

      return httpHelper.success(response, result);
    } catch (error: any) {
      return httpHelper.badRequestError(
        response,
        Result.error(500, error.toString())
      );
    }
  }
}
