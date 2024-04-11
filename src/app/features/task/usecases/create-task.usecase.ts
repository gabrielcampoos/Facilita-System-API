import { CacheRepository } from "../../../shared/database/repositories";
import { Result, ResultDTO } from "../../../shared/utils";
import { CreateTaskDTO } from "../dtos";
import { TaskRepository } from "../repository";

const PREFIX_CACHE = "list-tasks";

export class CreateTaskUsecase {
  async execute(data: CreateTaskDTO): Promise<ResultDTO> {
    const repository = new TaskRepository();
    const cacheRepository = new CacheRepository();

    const newTask = await repository.createTask(data);

    await cacheRepository.delete(`${PREFIX_CACHE}-${data.author}`);

    return Result.success(200, "Tarefa criada com sucesso.", newTask.toJSON());
  }
}
