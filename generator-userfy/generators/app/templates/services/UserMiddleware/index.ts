import Router from 'vue-router';
import {
  AUTH_STATE_NO_AUTH,
  AUTH_STATE_AUTH_SUCCESS,
  AUTH_STATE_AUTH_PROCESS,
  AUTH_STATE_AUTH_FAIL,
  STORE_AUTH_STATE,
  STORE_RESET,
  STORE_UPDATE,
} from './vuex';
import {getAccount, getAuthTokenByLoginAndPassword} from '@/services/Api/modules/user';
import {GetTokenByLoginAndPasswordRequest} from '@/services/Api/models/request/GetTokenByLoginAndPasswordRequest';
import {TokenResponseModel} from '@/services/Api/models/responses/TokenResponseModel';
import {Store} from 'vuex';
import EventEmitter = NodeJS.EventEmitter;
import {UserModel, User} from '@/services/Models/User';
import {ErrorModel} from '@/services/Api/models/Error';

class UserService {
  private Store: Store<any>;
  private EventEmitter: EventEmitter;

  constructor(StoreInst: Store<any>, EE: EventEmitter) {
    this.Store = StoreInst;
    this.EventEmitter = EE;
  }

  public async loginByToken(token: string) {
    const prevToken = this.Store.state.user.token;

    this.Store.commit(`user/${STORE_UPDATE}`, { token });

    try {
      const accountData: User = await getAccount(token);
      return this.endLogin(accountData, null);
    } catch (ER) {
      this.Store.commit(`user/${STORE_UPDATE}`, { token: prevToken });
      return this.endLogin(null, ER);
    }
  }

  public async login(login: string, password: string) {
    this.Store.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_PROCESS);

    try {
      const tokenModel: TokenResponseModel = await getAuthTokenByLoginAndPassword(
        new GetTokenByLoginAndPasswordRequest({login, password}),
      );

      const { token } = tokenModel;

      this.Store.commit(`user/${STORE_UPDATE}`, { token });

      const accountData = await getAccount(token);

      return this.endLogin(accountData, null);
    } catch (ER) {
      // this.Store.commit(`user/${STORE_UPDATE}`, { token: null });

      return this.endLogin(null, ER);
    }
  }

  public logout() {
    return this.Store.dispatch('user/logout');
  }

  public isAuth() {
    return this.Store.getters['user/isAuth'];
  }

  public token() {
    return this.Store.state.user.token;
  }

  private endLogin(model: UserModel | null, error: ErrorModel | null) {
    // this.EventClient.emit('services:User:beforeLogin', request);

    if (error) {
      this.Store.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_FAIL);
      // this.EventClient.emit('services:User:loginFail', error);

      return Promise.reject(error);
    } else if (model) {
      this.Store.commit(`user/${STORE_UPDATE}`, model);
      this.Store.commit(`user/${STORE_AUTH_STATE}`, AUTH_STATE_AUTH_SUCCESS);

      // this.EventClient.emit('services:User:loginSuccess', model, RS);
      return Promise.resolve(model);
    }
  }
}


function patchRouter (Router: Router, User: UserService) {
  const resolveEnd = (to, from, next) => {
    if (to.meta.requireAuth === true && !User.isAuth()) {
      next('/login', {
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  };

  Router.beforeEach((to, from, next) => {
    if (!User.isAuth()) {
      if (User.token()) {
        return User.loginByToken(User.token())
          .then(() => {
            next();
          })
          .catch(() => {
            resolveEnd(to, from, next);
          });
      }
    }

    resolveEnd(to, from, next);
  });
};



export {
  UserService,
  patchRouter
};
