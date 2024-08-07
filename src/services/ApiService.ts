import axios from 'axios';
import toast from 'react-hot-toast';
import { getAuthFromCache } from '../utils/getAuthFromCache';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api`,
});

// append auth token here rather than in initialization of axios
// or we can't get the token without refresh page after signing in
api.interceptors.request.use((config) => {
  const auth = getAuthFromCache();
  config.headers.Authorization = `Bearer ${auth ? auth.token : ''}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(`${error.response.data.message}`);
      console.table({ errorCause: error.response.data.cause });
    } else if (error.request) {
      toast.error('Request was made but no response was received');
    } else {
      toast.error(`Something went wrong: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

export default api;
