import {
  AUTH_STATE_AUTH_FAIL,
  AUTH_STATE_AUTH_PROCESS,
  AUTH_STATE_AUTH_SUCCESS,
  AUTH_STATE_NO_AUTH,
  STORE_AUTH_STATE,
  STORE_RESET,
  STORE_UPDATE
} from './const';


export default class User {
  constructor (ApiClient, StoreClient, EventClient) {
    this.ApiClient = ApiClient;
    this.StoreClient = StoreClient;
    this.EventClient = EventClient;
  }

  loginByToken (token) {
    if (typeof token === 'string') {
      return this._handleLogin(this.ApiClient.loginByToken(token));
    } else {
      return Promise.reject();
    }
  }

  login (login, password) {
    return this._handleLogin(this.ApiClient.login(login, password));
  }

  _handleLogin (request) {
    this.EventClient.emit('services:User:beforeLogin', request);
    this.StoreClient.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_PROCESS);

    return request
      .then((RS) => {
        const model = this.ApiClient.getProcessLoginResponse(RS);

        this.StoreClient.commit(`user/${STORE_UPDATE}`, model);
        this.StoreClient.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_SUCCESS);

        this.EventClient.emit('services:User:loginSuccess', model, RS);
        return Promise.resolve(model);
      })
      .catch((ER) => {
        const error = this.ApiClient.getProcessLoginError(ER);

        this.StoreClient.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_FAIL);
        this.EventClient.emit('services:User:loginFail', error);

        return Promise.reject(error);
      });
  }

  logout () {
    this.StoreClient.dispatch('user/logout');
  }

  isAuth () {
    return this.StoreClient.isAuth();
  }

  token () {
    return this.StoreClient.state().token;
  }
}
