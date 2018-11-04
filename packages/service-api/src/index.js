// @flow
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { logger as logIt } from '@hokid/webapp-service-utils';

const TAG = 'webapp:service-api';
let uid = 0;

export class ApiService {
  uid: number;
  CancelToken: any;
  client: Object;
  beforeHooks: Array<Function>;
  afterHooks: Array<Function>;
  devDebug: boolean;
  emitEvents: boolean;
  hooks: boolean;
  EventEmitter: any;

  constructor (options): void {
    this.uid = uid++;
    this.baseUrl = typeof options.base === 'string' ? options.base : '/api';
    this.EventEmitter = options.EventEmitterClient;
    this.beforeHooks = [];
    this.afterHooks = [];
    this.CancelToken = axios.CancelToken;
    this.setOptions(options);
    this.client = axios.create({
      baseURL: this.baseUrl
    });
  }

  setOptions(options = {}) {
    this.devDebug =
      typeof options.devDebug === 'boolean' ? options.devDebug :
        this.devDebug != null ? this.devDebug : true;
    this.emitEvents =
      typeof options.emitEvents === 'boolean'
        && this.EventEmitter
          ? options.emitEvents
          : false;
    this.hooks = typeof options.hooks === 'boolean' ? options.hooks :
      this.hooks != null ? this.hooks : true;
  }

  request (url: string, data: any, options: any = { method: 'get' }): any {
    let optionsSnapshot = cloneDeep(options);
    let dataSnapshot = cloneDeep(data);
    let cancelMethod = function() {};

    const dataProps = optionsSnapshot.method !== 'get' ? 'data' : 'params';

    if (this.emitEvents) {
      this.EventEmitter.emit(`${TAG}:request`, cloneDeep({
        url,
        data: dataSnapshot,
        options: optionsSnapshot
      }));
    }

    if (dataSnapshot != null && this.hooks) {
      dataSnapshot = this.callHook('before', dataSnapshot);
    }

    if (optionsSnapshot.cancelable === true) {
      optionsSnapshot.cancelToken = new this.CancelToken(c => {
        cancelMethod = c;
      });
    }

    if (this.devDebug) {
      logIt({
        tag: TAG,
        style: 'info',
        message: `requesting: ${url}`,
        debug: {
          url,
          data: dataSnapshot,
          options: optionsSnapshot
        }
      });
    }

    const promise = this.client.request(
      Object.assign(optionsSnapshot, { url, [ dataProps ]: dataSnapshot }))

      .then((RS) => {
        let rsData = RS.data;

        if (this.hooks) {
          rsData = this.callHook('after', rsData);
        }

        if (this.emitEvents) {
          this.EventEmitter.emit(`${TAG}:response`, cloneDeep({
            url,
            response: RS,
            data: rsData,
            options: optionsSnapshot
          }));
        }

        if (this.devDebug) {
          logIt({
            tag: TAG,
            style: 'success',
            message: `success request: ${url}`,
            debug: {
              url,
              response: RS,
              data: rsData,
              options: optionsSnapshot
            }
          });
        }

        return Promise.resolve({ response: RS, data: rsData });
      })
      .catch((ERR) => {
        let errData = ERR.response && ERR.response.data;

        if (ERR.response && this.hooks) {
          errData = this.callHook('after', errData);
        }

        if (axios.isCancel(ERR)) {
          ERR.isCancel = true;
          return Promise.reject({ response: ERR, data: errData });
        }

        if (this.devDebug) {
          logIt({
            tag: 'Api',
            style: 'error',
            message: `error response: ${url}`,
            debug: {
              url,
              response: ERR,
              error: errData,
              options: optionsSnapshot
            }
          });
        }

        if (this.emitEvents) {
          this.EventEmitter.emit(`${TAG}:error`, cloneDeep({
            url,
            response: ERR,
            error: errData,
            options: optionsSnapshot
          }));
        }

        return Promise.reject({ response: ERR, error: errData });
      });

    if (optionsSnapshot.cancelable === true) {
      return { promise, cancel: cancelMethod };
    } else {
      return promise;
    }
  }

  get (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'get' });
    return this.request(url, data, options);
  }

  post (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'post' });
    return this.request(url, data, options);
  }

  put (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'put' });
    return this.request(url, data, options);
  }

  delete (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'delete' });
    return this.request(url, data, options);
  }

  head (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'head' });
    return this.request(url, data, options);
  }

  patch (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'patch' });
    return this.request(url, data, options);
  }

  options (url: string, data: any, options: any = {}) {
    Object.assign(options, { method: 'options' });
    return this.request(url, data, options);
  }


  addHook (name: string, cb: Function) {
    switch (name) {
      case 'before':
        this.beforeHooks.push(cb);
        break;
      case 'after':
        this.afterHooks.push(cb);
        break;
    }
  }

  callHook (name, data) {
    switch (name) {
      case 'before':
        return this.beforeHooks.reduce((data, cb) => {
          return cb(data);
        }, data);
      case 'after':
        return this.afterHooks.reduce((data, cb) => {
          return cb(data);
        }, data);
    }
  }

  removeHook (name: string, cb: Function) {
    switch (name) {
      case 'before':
        this.beforeHooks = this.beforeHooks.filter((_cb) => {
          return _cb !== cb;
        });
        break;
      case 'after':
        this.afterHooks = this.afterHooks.filter((_cb) => {
          return _cb !== cb;
        });
        break;
    }
  }
}
