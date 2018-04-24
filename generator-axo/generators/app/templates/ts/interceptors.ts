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
