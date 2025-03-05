export const API_BASE_URL = 'https://questmast.rj.r.appspot.com/api'
import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../utils/constants/auth';

const token = localStorage.getItem(ACCESS_TOKEN_KEY);

const apiInstance = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    Authorization: `Bearer ${token ? JSON.parse(token) : ''}`,  
  },
});

export default apiInstance;
