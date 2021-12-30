import axios from 'axios';
import {BACKEND_URL, REQUEST_TIME_OUT} from '../const';


export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIME_OUT,
});

