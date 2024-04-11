import { UserJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { Result, ResultDTO } from "../../../shared/utils";
import { UserRepository } from "../repository";

const PREFIX_CACHE = "list-all-users";

export class ListAllUsersUsecase {
  async execute(): Promise<ResultDTO> {
    const repository = new UserRepository();
    const cacheRepository = new CacheRepository();

    const usersCache = await cacheRepository.get<UserJSON[]>(PREFIX_CACHE);

    let users: UserJSON[] = [];

    if (!usersCache) {
      const usersDB = await repository.listUsers();

      const users = usersDB.map((users) => users.toJSON());

      await cacheRepository.set(PREFIX_CACHE, users);
    } else {
      users = usersCache;
    }

    return Result.success(200, "Usuários cadastrados.", users);
  }
}
