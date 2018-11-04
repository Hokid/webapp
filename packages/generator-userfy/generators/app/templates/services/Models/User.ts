export interface User {
  id: string;
  name: string;
  token: string | null | void;
}

export class UserModel implements User {
  public id: string;
  public name: string;
  public token: string | null | void;

  constructor(model: User) {
    this.id = model.id;
    this.name = model.name;
    this.token = model.token;
  }
}
