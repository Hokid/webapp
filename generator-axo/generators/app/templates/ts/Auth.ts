import axios from 'axios';
import {AxiosInstance} from 'axios';

export default axios.create({
  // set the api url
  baseURL: process.env.API_URL,
});

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
