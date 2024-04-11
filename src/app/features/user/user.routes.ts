import { Router } from "express";
import { auth } from "../../shared/middlewares";
import { UserController } from "./controller";
import {
  clearFields,
  validateLogin,
  validateNewUserFields,
} from "./middlewares";

export default () => {
  const router = Router();

  router.post(
    "/user",
    [validateNewUserFields, clearFields],
    UserController.createUser
  );

  router.post("/login", validateLogin, UserController.loginUser);
  router.get("/user", UserController.listUsers);
  router.get("/validateDataUser", auth, UserController.getUser);

  return router;
};
