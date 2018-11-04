export class TokenResponseModel {
  public token: string;

  constructor(model: { token: string }) {
    this.token = model.token;
  }
}
