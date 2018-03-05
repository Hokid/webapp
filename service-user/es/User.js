import "core-js/modules/es6.promise";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { AUTH_STATE_AUTH_FAIL, AUTH_STATE_AUTH_PROCESS, AUTH_STATE_AUTH_SUCCESS, AUTH_STATE_NO_AUTH, STORE_AUTH_STATE, STORE_RESET, STORE_UPDATE } from './const';

var User =
/*#__PURE__*/
function () {
  function User(ApiClient, StoreClient, EventClient) {
    _classCallCheck(this, User);

    this.ApiClient = ApiClient;
    this.StoreClient = StoreClient;
    this.EventClient = EventClient;
  }

  _createClass(User, [{
    key: "loginByToken",
    value: function loginByToken(token) {
      if (typeof token === 'string') {
        return this._handleLogin(this.ApiClient.loginByToken(token));
      } else {
        return Promise.reject();
      }
    }
  }, {
    key: "login",
    value: function login(_login, password) {
      return this._handleLogin(this.ApiClient.login(_login, password));
    }
  }, {
    key: "_handleLogin",
    value: function _handleLogin(request) {
      var _this = this;

      this.EventClient.emit('services:User:beforeLogin', request);
      this.StoreClient.commit("user/".concat(STORE_AUTH_STATE), AUTH_STATE_AUTH_PROCESS);
      return request.then(function (RS) {
        var model = _this.ApiClient.getProcessLoginResponse(RS);

        _this.StoreClient.commit("user/".concat(STORE_UPDATE), model);

        _this.StoreClient.commit("user/".concat(STORE_AUTH_STATE), AUTH_STATE_AUTH_SUCCESS);

        _this.EventClient.emit('services:User:loginSuccess', model, RS);

        return Promise.resolve(model);
      }).catch(function (ER) {
        var error = _this.ApiClient.getProcessLoginError(ER);

        _this.StoreClient.commit("user/".concat(STORE_AUTH_STATE), AUTH_STATE_AUTH_FAIL);

        _this.EventClient.emit('services:User:loginFail', error);

        return Promise.reject(error);
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      this.StoreClient.dispatch('user/logout');
    }
  }, {
    key: "isAuth",
    value: function isAuth() {
      return this.StoreClient.isAuth();
    }
  }, {
    key: "token",
    value: function token() {
      return this.StoreClient.state().token;
    }
  }]);

  return User;
}();

export { User as default };