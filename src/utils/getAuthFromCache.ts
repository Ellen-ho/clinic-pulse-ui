import { AuthState } from '../context/AuthContext';

interface IGetAuthFromCache extends AuthState {}

export const getAuthFromCache = (): IGetAuthFromCache | null => {
  const cachedAuth = localStorage.getItem('auth');
  return cachedAuth ? JSON.parse(cachedAuth) : null;
};
