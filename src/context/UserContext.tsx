import { createContext, useContext } from 'react';
import { IAccount } from '../types/Users';

interface IUserContext {
  currentUser: IAccount | null;
  isCurrentUser: (userId: string) => boolean;
}

const UserContext = createContext<IUserContext>({
  currentUser: null,
  isCurrentUser: () => false,
});

export const useUserContext = () => useContext(UserContext);
