import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database";
import { Task } from "../../../models";
import { TaskEntity, UserEntity } from "../../../shared/database/entities";
import { CreateTaskDTO, EditTaskDTO } from "../dtos";

interface ToAlterTaskDTO {
  id: string;
  title?: string;
  task?: string;
}

export class TaskRepository {
  private _manager = DatabaseConnection.connection.manager;

  async userExists(username: string): Promise<boolean> {
    const userExists = await this._manager.findOneBy(UserEntity, {
      username,
    });

    return !!userExists;
  }

  async taskExists(username: string, id: string): Promise<Task | undefined> {
    const taskFound = await this._manager.findOne(TaskEntity, {
      where: {
        id: id,
        author: username,
      },
      relations: {
        user: true,
      },
    });

    if (!taskFound) return undefined;

    return this.entityToModel(taskFound);
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    const createTask = this._manager.create(TaskEntity, { ...data });

    const taskCreated = await this._manager.save(createTask);

    return this.entityToModel(taskCreated);
  }

  async listTasks(username: string): Promise<Task[]> {
    const clausule: FindOptionsWhere<TaskEntity> = {
      author: username,
    };

    const listedTasks = await this._manager.find(TaskEntity, {
      where: clausule,
    });

    return listedTasks.map((tasks) => this.entityToModel(tasks));
  }

  async editTask(data: ToAlterTaskDTO): Promise<void> {
    const { id, title, task } = data;

    await this._manager.update(TaskEntity, { id: id }, { title, task });
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this._manager.delete(TaskEntity, {
      id: id,
    });

    if (!task) return undefined;
  }

  private entityToModel(dataDB: TaskEntity): Task {
    return new Task(dataDB.id, dataDB.author, dataDB.title, dataDB.task);
  }
}
