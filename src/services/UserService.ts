import { GenderType } from '../types/Share';
import { UserRoleType } from '../types/Users';
import api from './ApiService';

interface ISigninRequest {
  email: string;
  password: string;
}

interface ISigninResponse {
  token: string;
  user: {
    id: string;
    createdAt: string;
    role: string;
    avatar: string | null;
  };
  doctorId: string;
}

interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleType;
  onboardDate: Date;
  gender: GenderType;
  birthDate: Date;
}

interface ISignupResponse {
  id: string;
  email: string;
  role: string;
}

export const signinUser = async (
  data: ISigninRequest,
): Promise<ISigninResponse> => {
  const response = await api.post<ISigninResponse>('/users/signin', data);
  return response.data;
};

export const signupUser = async (
  data: ISignupRequest,
): Promise<ISignupResponse> => {
  const response = await api.post<ISignupResponse>('/users', data);
  return response.data;
};
