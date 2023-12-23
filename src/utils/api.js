import axios from 'axios';

const API_ROUTE = process.env.REACT_APP_API_ROUTE;

const api = axios.create({
  baseURL: API_ROUTE
});

export default api;
