export class GetTokenByLoginAndPasswordRequest {
  public login: string;
  public password: string;

  constructor(model: { login: string, password: string }) {
    this.login = String(model.login);
    this.password = String(model.password);
  }
}
