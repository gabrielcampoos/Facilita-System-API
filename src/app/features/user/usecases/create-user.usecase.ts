import { Result, ResultDTO, bcrypt } from "../../../shared/utils";
import { CreateUserDTO } from "../dtos";
import { UserRepository } from "../repository";

export class CreateUserUsecase {
  async execute(data: CreateUserDTO): Promise<ResultDTO> {
    const repository = new UserRepository();

    const userExists = await repository.findUserByUsername(data.username);

    if (userExists) return Result.error(400, "Usuário já cadastrado.");

    const passwordHash = await bcrypt.generateHash(data.password);
    data.password = passwordHash;

    const newUser = await repository.register(data);

    return Result.success(200, "Usuário criado com sucesso.", newUser.toJSON());
  }
}
