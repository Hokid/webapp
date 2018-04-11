import "core-js/modules/es6.promise";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import "core-js/modules/es6.object.assign";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import GlobalEvents from '@hokid/webapp-service-global-events';
import { logger as logIt } from '@hokid/webapp-service-utils';
var TAG = 'webapp:service-api';
var uid = 0;
export var ApiService =
/*#__PURE__*/
function () {
  function ApiService(options) {
    _classCallCheck(this, ApiService);

    Object.defineProperty(this, "uid", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "CancelToken", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "beforeHooks", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "afterHooks", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "devDebug", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "emitEvents", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "hooks", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.uid = uid++;
    this.baseUrl = typeof options.base === 'string' ? options.base : '/api';
    this.beforeHooks = [];
    this.afterHooks = [];
    this.CancelToken = axios.CancelToken;
    this.setOptions(options);
    this.client = axios.create({
      baseURL: this.baseUrl
    });
  }

  _createClass(ApiService, [{
    key: "setOptions",
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.devDebug = typeof options.devDebug === 'boolean' ? options.devDebug : this.devDebug != null ? this.devDebug : true;
      this.emitEvents = typeof options.emitEvents === 'boolean' ? options.emitEvents : this.emitEvents != null ? this.emitEvents : true;
      this.hooks = typeof options.hooks === 'boolean' ? options.hooks : this.hooks != null ? this.hooks : true;
    }
  }, {
    key: "request",
    value: function request(url, data) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        method: 'get'
      };
      var optionsSnapshot = cloneDeep(options);
      var dataSnapshot = cloneDeep(data);

      var cancelMethod = function cancelMethod() {};

      var dataProps = optionsSnapshot.method !== 'get' ? 'data' : 'params';

      if (this.emitEvents) {
        GlobalEvents.emit("".concat(TAG, ":request"), cloneDeep({
          url: url,
          data: dataSnapshot,
          options: optionsSnapshot
        }));
      }

      if (dataSnapshot != null && this.hooks) {
        dataSnapshot = this.callHook('before', dataSnapshot);
      }

      if (optionsSnapshot.cancelable === true) {
        optionsSnapshot.cancelToken = new this.CancelToken(function (c) {
          cancelMethod = c;
        });
      }

      if (this.devDebug) {
        logIt({
          tag: TAG,
          style: 'info',
          message: "requesting: ".concat(url),
          debug: {
            url: url,
            data: dataSnapshot,
            options: optionsSnapshot
          }
        });
      }

      var promise = this.client.request(Object.assign(optionsSnapshot, _defineProperty({
        url: url
      }, dataProps, dataSnapshot))).then(function (RS) {
        var rsData = RS.data;

        if (_this.hooks) {
          rsData = _this.callHook('after', rsData);
        }

        if (_this.emitEvents) {
          GlobalEvents.emit("".concat(TAG, ":response"), cloneDeep({
            url: url,
            response: RS,
            data: rsData,
            options: optionsSnapshot
          }));
        }

        if (_this.devDebug) {
          logIt({
            tag: TAG,
            style: 'success',
            message: "success request: ".concat(url),
            debug: {
              url: url,
              response: RS,
              data: rsData,
              options: optionsSnapshot
            }
          });
        }

        return Promise.resolve({
          response: RS,
          data: rsData
        });
      }).catch(function (ERR) {
        var errData = ERR.response && ERR.response.data;

        if (ERR.response && _this.hooks) {
          errData = _this.callHook('after', errData);
        }

        if (axios.isCancel(ERR)) {
          ERR.isCancel = true;
          return Promise.reject({
            response: ERR,
            data: errData
          });
        }

        if (_this.devDebug) {
          logIt({
            tag: 'Api',
            style: 'error',
            message: "error response: ".concat(url),
            debug: {
              url: url,
              response: ERR,
              error: errData,
              options: optionsSnapshot
            }
          });
        }

        if (_this.emitEvents) {
          GlobalEvents.emit("".concat(TAG, ":error"), cloneDeep({
            url: url,
            response: ERR,
            error: errData,
            options: optionsSnapshot
          }));
        }

        return Promise.reject({
          response: ERR,
          error: errData
        });
      });

      if (optionsSnapshot.cancelable === true) {
        return {
          promise: promise,
          cancel: cancelMethod
        };
      } else {
        return promise;
      }
    }
  }, {
    key: "get",
    value: function get(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'get'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'post'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'put'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'delete'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'head'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "patch",
    value: function patch(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.assign(options, {
        method: 'patch'
      });
      return this.request(url, data, options);
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      Object.assign(_options, {
        method: 'options'
      });
      return this.request(url, data, _options);
    }
  }, {
    key: "addHook",
    value: function addHook(name, cb) {
      switch (name) {
        case 'before':
          this.beforeHooks.push(cb);
          break;

        case 'after':
          this.afterHooks.push(cb);
          break;
      }
    }
  }, {
    key: "callHook",
    value: function callHook(name, data) {
      switch (name) {
        case 'before':
          return this.beforeHooks.reduce(function (data, cb) {
            return cb(data);
          }, data);

        case 'after':
          return this.afterHooks.reduce(function (data, cb) {
            return cb(data);
          }, data);
      }
    }
  }, {
    key: "removeHook",
    value: function removeHook(name, cb) {
      switch (name) {
        case 'before':
          this.beforeHooks = this.beforeHooks.filter(function (_cb) {
            return _cb !== cb;
          });
          break;

        case 'after':
          this.afterHooks = this.afterHooks.filter(function (_cb) {
            return _cb !== cb;
          });
          break;
      }
    }
  }]);

  return ApiService;
}();