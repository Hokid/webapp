export class ErrorModel {
  public code: number;
  public message: string;
  public additional: { [key: string]: any };

  constructor(error = {} as { code: number, message?: string, [key: string]: any }) {
    this.code = error.code;
    this.message = error.message || '';
    this.additional = {};

    Object.keys(error)
      .filter((key) => !['code', 'message'].includes(key))
      .forEach((key) => (this.additional[key] = error[key]));
  }
}
