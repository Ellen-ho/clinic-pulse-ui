import { UserRoleType } from '../types/Users';
import api from './ApiService';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  user: {
    id: string;
    createdAt: string;
    displayName: string;
    role: string;
    avatar: string | null;
  };
  patientId: string;
  doctorId: string;
  hasProfile: boolean;
}

interface ISignupRequest {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

interface ISignupResponse {
  id: string;
  displayName: string;
  email: string;
  role: string;
}

interface IGetUserAccountResponse {
  id: string;
  displayName: string;
  email: string;
  role: UserRoleType;
  createdAt: Date;
  updatedAt: Date;
}

interface IEditUserAccountRequest {
  displayName: string;
  password: string;
}

interface IEditUserAccountResponse {
  id: string;
  displayName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUploadAvatarImageResponse {
  imageUrl: string;
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

export const updatePassword = async (
  data: IUpdatePasswordRequest,
): Promise<IUpdatePasswordResponse> => {
  const response = await api.patch<IUpdatePasswordResponse>(
    '/users/reset-password',
    data,
  );
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

export const loginUser = async (
  data: ILoginRequest,
): Promise<ILoginResponse> => {
  const response = await api.post<ILoginResponse>('/users/login', data);
  return response.data;
};

export const signupUser = async (
  data: ISignupRequest,
): Promise<ISignupResponse> => {
  const response = await api.post<ISignupResponse>('/users', data);
  return response.data;
};

export const getUserAccount = async (): Promise<IGetUserAccountResponse> => {
  const response = await api.get<IGetUserAccountResponse>('/users/account');
  return response.data;
};

export const editUserAccount = async (
  data: IEditUserAccountRequest,
): Promise<IEditUserAccountResponse> => {
  const response = await api.patch<IEditUserAccountResponse>(
    '/users/account',
    data,
  );
  return response.data;
};

export const getOAuthAccessToken = async (): Promise<ILoginResponse> => {
  const response = await api.get<ILoginResponse>('/auth/success', {
    withCredentials: true,
  });
  return response.data;
};

export const uploadAvatar = async (
  imageFile: File,
): Promise<IUploadAvatarImageResponse> => {
  const formData = new FormData();
  formData.append('avatar', imageFile);

  const response = await api.post<IUploadAvatarImageResponse>(
    '/users/upload-avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};
