import { Base } from "./Base";

export interface UserJSON {
  id: string;
  name: string;
  username: string;
}

export class User extends Base {
  constructor(
    _id: string,
    private _name: string,
    private _username: string,
    private _password: string
  ) {
    super(_id);
  }

  toJSON(): UserJSON {
    return {
      id: this._id,
      name: this._name,
      username: this._username,
    };
  }

  toJSONWithPassword() {
    return {
      id: this._id,
      name: this._name,
      username: this._username,
      password: this._password,
    };
  }
}
