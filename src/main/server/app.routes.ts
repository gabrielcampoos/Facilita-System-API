import { Express } from "express";
import userRoutes from "../../app/features/user/user.routes";
import taskRoutes from "../../app/features/task/task.routes";

export const makeRoutes = (app: Express) => {
  app.use(userRoutes(), taskRoutes());
};
