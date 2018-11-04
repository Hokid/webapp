import EventEmitter = NodeJS.EventEmitter;
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export function emitEventsInterceptor(Axios: AxiosInstance, EE: EventEmitter) {
  Axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const method = config.method || 'Unknown';

    EE.emit(`request:${method.toLowerCase()}`, config);

    return config;
  }, (error: AxiosError) => {
    EE.emit(`request:error`, error);

    return Promise.reject(error);
  });

  Axios.interceptors.response.use((response: AxiosResponse<any>) => {
    const { config } = response;
    const method = config.method || 'Unknown';

    EE.emit(`response:${method.toLowerCase()}`, response);

    return response;
  }, (error: AxiosError) => {
    EE.emit(`response:error`, error);

    return Promise.reject(error);
  });
}

/*
* // in entrypoint
*
* import Auth, { injectBearerAuthInterceptor } from "<__dirname>/Auth.ts";
*
* injectBearerAuthInterceptor(Auth, () => 'token');
*
* */
export function injectBearerAuthInterceptor(ApiClient: AxiosInstance, tokenGetter: () => string | void) {
  ApiClient.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${tokenGetter()}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}


export function injectLogoutOnTokenExpireInterceptor(ApiClient: AxiosInstance, User: UserService) {
  ApiClient.interceptors.response.use((response: AxiosResponse<any>) => {
    return response;
  }, (error: AxiosError) => {
    if (error.response) {
      // token expire
      console.log(error.response);
      if (error.response.status == 401) {
        User.logout(false);
      }
    }

    return Promise.reject(error);
  });
}