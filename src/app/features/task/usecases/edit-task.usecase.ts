import { CacheRepository } from "../../../shared/database/repositories";
import { Result, ResultDTO } from "../../../shared/utils";
import { UserRepository } from "../../user/repository";
import { EditTaskDTO } from "../dtos";
import { TaskRepository } from "../repository";

const PREFIX_CACHE = "list-tasks";

export class EditTaskUsecase {
  async execute(data: EditTaskDTO): Promise<ResultDTO> {
    const { id, username, newData } = data;

    const userRepository = new UserRepository();
    const taskRepository = new TaskRepository();
    const cacheRepository = new CacheRepository();

    const userFound = await userRepository.findUserByUsername(username);

    if (!userFound) return Result.error(400, "Usuário não encontrado.");

    const task = await taskRepository.taskExists(username, id);

    if (!task) return Result.error(400, "Tarefa não encontrada.");

    const updated = task.updateTask({
      title: newData.title,
      task: newData.task,
      createdAt: newData.createdAt,
    });

    await cacheRepository.delete(`${PREFIX_CACHE}-${username}`);
    await cacheRepository.delete(`${PREFIX_CACHE}-${id}`);

    if (!updated) return Result.error(400, "Tarefa não pode ser atualizada.");

    const taskJSON = task.toJSON();

    taskRepository.editTask({
      id,
      title: taskJSON.title,
      task: taskJSON.task,
    });

    return Result.success(200, "Tarefa editada com sucesso.", task);
  }
}
