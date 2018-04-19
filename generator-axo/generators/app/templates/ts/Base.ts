import axios from 'axios';

export default axios.create({
  // set the api url
  baseURL: process.env.API_URL,
});
