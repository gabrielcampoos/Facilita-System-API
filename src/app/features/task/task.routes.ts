import { Router } from "express";
import { auth } from "../../shared/middlewares";
import { TaskController } from "./controller";

export default () => {
  const router = Router();

  router.post("/task", auth, TaskController.createTask);

  router.get("/task", auth, TaskController.listTasks);

  router.put("/task/:id", auth, TaskController.editTask);

  router.delete("/task/:id", auth, TaskController.deleteTask);

  return router;
};
