import { DatabaseConnection } from "../../../../main/database";
import { User } from "../../../models";
import { UserEntity } from "../../../shared/database/entities";
import { CreateUserDTO } from "../dtos";

export class UserRepository {
  private _manager = DatabaseConnection.connection.manager;

  async findUserByUsername(username: string): Promise<User | null> {
    const userExists = await this._manager.findOneBy(UserEntity, {
      username,
    });

    if (!userExists) return null;

    return this.entityToModel(userExists);
  }

  async register(user: CreateUserDTO): Promise<User> {
    const createUser = this._manager.create(UserEntity, { ...user });

    const createdUser = await this._manager.save(createUser);

    return this.entityToModel(createdUser);
  }

  async listUsers(): Promise<User[]> {
    const listUsers = await this._manager.find(UserEntity);

    return listUsers.map((users) => this.entityToModel(users));
  }

  private entityToModel(dataDB: UserEntity): User {
    return new User(dataDB.id, dataDB.name, dataDB.username, dataDB.password);
  }
}
