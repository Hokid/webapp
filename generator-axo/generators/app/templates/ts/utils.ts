import { AxiosError, AxiosResponse } from 'axios';
import { ErrorModel } from './models/Error';

export function transformResponseToErrorModel(
  error: AxiosError & { code: number, message: string },
  doThrow: boolean = true,
) {
  const model = {
    code: -200,
    message: 'error has no description',
  };

  if (error.response) {
    if (error.response.data) {
      if (error.response.data.error) {
        let message = error.response.data.error.message as string;
        let code = error.response.data.error.code as number;

        if (message != null) {
          if (typeof message === 'object') {
            message = JSON.stringify(message);
          }
        } else {
          message = error.response.statusText || model.message;
        }

        if (code == null) {
          code = error.response.status;
        }

        model.code = code as number;
        model.message = message as string;
      }
    }
  } else if (error.request) {
    model.code = error.request.status;
    model.message = error.request.statusText;
  } else if (
    typeof model.code === 'number'
    && typeof model.message === 'string'
  ) {
    model.code = error.code;
    model.message = error.message;
  }

  const response = new ErrorModel(model);

  if (doThrow) {
    throw response;
  }

  return response;
}



export function responseToModel(Model: { new (model: any): any }) {
  return (response: AxiosResponse) => new Model(response.data);
}
