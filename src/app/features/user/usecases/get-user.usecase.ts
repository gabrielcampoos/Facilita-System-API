import { Result, ResultDTO } from "../../../shared/utils";
import { UserRepository } from "../repository";

export class GetUserUsercase {
  async execute(username: string): Promise<ResultDTO> {
    const repository = new UserRepository();

    const user = await repository.findUserByUsername(username);

    if (!user) return Result.error(400, "Usuário não encontrado.");

    return Result.success(
      200,
      "Usuário encontrado com sucesso.",
      user.toJSON()
    );
  }
}
