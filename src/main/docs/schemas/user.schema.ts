export const userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      summary: "Identificador do usuário",
    },

    name: {
      type: "string",
    },
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["id", "name", "username"],
};
