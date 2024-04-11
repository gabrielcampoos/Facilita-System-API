export interface EditTaskDTO {
  id: string;
  username: string;
  newData: {
    title?: string;
    task?: string;
    createdAt: Date;
  };
}
