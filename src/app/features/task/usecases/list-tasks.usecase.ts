import { TaskJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { Result, ResultDTO } from "../../../shared/utils";
import { TaskRepository } from "../repository";

const PREFIX_CACHE = "list-tasks";

export class ListTasksUsecase {
  async execute(username: string): Promise<ResultDTO> {
    const repository = new TaskRepository();
    const cacheRepository = new CacheRepository();

    const userExists = await repository.userExists(username);

    if (!userExists) return Result.error(400, "Usuário não encontrado.");

    const tasksCache = await cacheRepository.get<TaskJSON[]>(
      `${PREFIX_CACHE}-${username}`
    );

    let tasks: TaskJSON[] = [];

    if (!tasksCache) {
      const mainTasks = await repository.listTasks(username);
      tasks = mainTasks.map((task) => task.toJSON());

      await cacheRepository.set<TaskJSON[]>(
        `${PREFIX_CACHE}-${username}`,
        tasks
      );
    } else {
      tasks = tasksCache;
    }

    return Result.success(200, "Tarefas listadas com sucesso.", tasks);
  }
}
