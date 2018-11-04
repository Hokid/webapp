import auth from '../Auth';
import base from '../Base';
import { GetTokenByLoginAndPasswordRequest } from '../models/request/GetTokenByLoginAndPasswordRequest';
import { TokenResponseModel } from '../models/responses/TokenResponseModel';
import { throwIfNotInstanse } from '@/services/utils';
import {transformResponseToErrorModel, responseToModel} from '@/services/Api/utils';
import {AxiosError, AxiosResponse} from 'axios';
import {UserModel, User} from '@/services/Models/User';
import {ErrorModel} from '@/services/Api/models/Error';
// import qs from 'qs';

export function getAuthTokenByLoginAndPassword(requestModel: GetTokenByLoginAndPasswordRequest) {
  throwIfNotInstanse(requestModel, GetTokenByLoginAndPasswordRequest);

  return (
    base.request({
      method: 'post',
      url: '/auth/get-token/',
      data: requestModel,
    })
      .then(responseToModel(TokenResponseModel))
      .catch(transformResponseToErrorModel)
  );
}

export function getAccount(token: string): Promise<User> {
  return (
    auth.request({
      method: 'post',
      url: '/account/signin/',
      data: { token },
    })
      .then(responseToModel(UserModel))
      .catch(transformResponseToErrorModel)
  );
}
