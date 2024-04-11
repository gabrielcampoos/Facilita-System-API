import { CacheRepository } from "../../../shared/database/repositories";
import { Result, ResultDTO } from "../../../shared/utils";
import { UserRepository } from "../../user/repository";
import { TaskRepository } from "../repository";

const PREFIX_CACHE = "list-tasks";

export class DeleteTaskUsecase {
  async execute(id: string, username: string): Promise<ResultDTO> {
    const taskRepository = new TaskRepository();
    const userRepository = new UserRepository();
    const cacheRepository = new CacheRepository();

    const userFound = await userRepository.findUserByUsername(username);

    if (!userFound)
      return Result.error(
        400,
        "Usuário não encontrado. Não foi possível excluir a tarefa."
      );

    const task = await taskRepository.taskExists(username, id);

    if (!task) return Result.error(400, "Tarefa não encontrada.");

    await taskRepository.deleteTask(id);
    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    return Result.success(200, "Tarefa excluida com sucesso.", id);
  }
}
