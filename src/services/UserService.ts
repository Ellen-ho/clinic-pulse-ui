import { GenderType } from '../types/Share';
import { IPermission, UserRoleType } from '../types/Users';
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
  permissions: IPermission;
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

interface ICreatePasswordChangeMailRequest {
  email: string;
}

interface ICreatePasswordChangeMailResponse {
  success: boolean;
  error?: string;
}

interface IUpdatePasswordRequest {
  newPassword: string;
  resetToken: string;
}

interface IUpdatePasswordResponse {
  success: boolean;
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

export const createPasswordChangeMail = async (
  data: ICreatePasswordChangeMailRequest,
): Promise<ICreatePasswordChangeMailResponse> => {
  const response = await api.post<ICreatePasswordChangeMailResponse>(
    '/users/reset-password-mail',
    data,
  );
  return response.data;
};

export const updatePassword = async (
  data: IUpdatePasswordRequest,
): Promise<IUpdatePasswordResponse> => {
  const response = await api.patch<IUpdatePasswordResponse>(
    '/users/reset-password',
    data,
  );
  return response.data;
};
