import { AxiosError, AxiosResponse } from 'axios';
import { ErrorModel } from './models/Error';

export function transformResponseToErrorModel(
  error: AxiosError & { code: number, message: string },
  doThrow: boolean = true,
  doThrow?: true,
): never;
export function transformResponseToErrorModel(
  error: AxiosError & { code: number, message: string },
  doThrow?: false,
): never;
export function transformResponseToErrorModel(
  error: AxiosError & { code: number, message: string },
  doThrow = true,
) {
  const model = {
    code: -200,
    message: 'error has no description',
  };

  if (
    error.response
    &&
    error.response.data
    &&
    typeof error.response.data.error === 'object'
  ) {
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


export function responseToModel<I, O>(Model: { new(model: I): O }, list?: false): (response: AxiosResponse<I>) => O;
export function responseToModel<I, O>(Model: { new(model: I): O }, list?: true): (response: AxiosResponse<I[]>) => O[];
export function responseToModel<I, O>(Model: { new(model: I): O }, list = false) {
  return (response: AxiosResponse<I | I[]>) => {
    if (!list) {
      return new Model(response.data as I);
    } else {
      return (response.data as I[]).map((item: I) => new Model(item));
    }
  };
}
