import { Base } from "./Base";

export interface TaskJSON {
  id: string;
  title?: string;
  task?: string;
  author: string;
  createdAt: Date;
}

interface UpdateTaskDTO {
  title?: string;
  task?: string;
  createdAt: Date;
}

export class Task extends Base {
  private _createdAt: Date;

  constructor(
    _id: string,
    private _author: string,
    private _title?: string,
    private _task?: string
  ) {
    super(_id);
    this._createdAt = new Date();
  }

  toJSON(): TaskJSON {
    return {
      id: this._id,
      title: this._title,
      task: this._task,
      author: this._author,
      createdAt: this._createdAt,
    };
  }

  updateTask(data: UpdateTaskDTO): boolean {
    if (data.title) {
      if (data.title?.length < 0) {
        return false;
      }

      this._title = data.title;
    }

    if (data.task) {
      if (data.task?.length < 0) {
        return false;
      }
      this._task = data.task;
    }

    if (data.createdAt) {
      this._createdAt = data.createdAt;
    }

    return true;
  }
}
