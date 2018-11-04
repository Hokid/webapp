import axios from 'axios';
import {AxiosInstance} from 'axios';

export default axios.create({
  // set the api url
  baseURL: process.env.API_URL,
});
