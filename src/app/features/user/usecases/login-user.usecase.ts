import { Result, ResultDTO, bcrypt, jwt } from "../../../shared/utils";
import { CreateUserDTO } from "../dtos";
import { UserRepository } from "../repository";

type LoginUserDTO = Omit<CreateUserDTO, "name">;

export class LoginUserUsecase {
  async execute(data: LoginUserDTO): Promise<ResultDTO> {
    const repository = new UserRepository();

    const userExists = await repository.findUserByUsername(data.username);

    if (!userExists) return Result.error(404, "Usuário não encontrado.");

    const validPassword = await bcrypt.compareHash(
      data.password,
      userExists.toJSONWithPassword().password
    );

    if (!validPassword) return Result.error(404, "Usuário ou senha inválidos.");

    const dataUser = userExists.toJSON();
    const token = jwt.encoded(dataUser);

    return Result.success(200, "Usuário logado com sucesso.", {
      ...dataUser,
      token,
    });
  }
}
