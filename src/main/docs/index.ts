import {
  badRequestComponent,
  notFoundComponent,
  securityComponent,
  serverErrorComponent,
  unauthorizedComponent,
} from "./components";
import { authPath, signinPath, signupPath, taskPath } from "./docs";
import { authSchema, errorSchema, taskSchema, userSchema } from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "Facilita System API",
    description: "Projeto teste",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  paths: {
    "/signin": signinPath,
    "/signup": signupPath,
    "/auth": authPath,
    "/task": taskPath,
  },
  schemas: {
    error: errorSchema,
    user: userSchema,
    task: taskSchema,
    auth: authSchema,
  },
  components: {
    badRequest: badRequestComponent,
    serverError: serverErrorComponent,
    notFound: notFoundComponent,
    unauthorized: unauthorizedComponent,
    securitySchemes: securityComponent,
  },
};
