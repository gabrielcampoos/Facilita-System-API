export const taskSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      summary: "Identificador da tarefa",
    },
    title: {
      type: "string",
    },
    task: {
      type: "string",
    },
    author: {
      $ref: "#/schemas/user",
      summary: "Usuário que criou esta tarefa",
    },
    createdAt: {
      type: "Date",
    },
  },
  required: ["id", "title", "task", "author", "createdAt"],
};
