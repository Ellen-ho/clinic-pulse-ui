import { GenderType } from '../types/Share';
import api from './ApiService';

export interface IGetAllDoctorsResponse {
  doctors: Array<{
    id: string;
    fullName: string;
  }>;
}

export interface IGetDoctorProfileRequest {
  doctorId: string;
}

export interface IGetDoctorProfileResponse {
  id: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  gender: GenderType;
  birthDate: Date;
  onboardDate: Date;
  resignationDate: Date | null;
  email: string;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllDoctors = async (): Promise<IGetAllDoctorsResponse> => {
  const response = await api.get<IGetAllDoctorsResponse>('/doctors');
  return response.data;
};

export const getDoctorProfile = async ({
  doctorId,
}: IGetDoctorProfileRequest): Promise<IGetDoctorProfileResponse> => {
  const response = await api.get<IGetDoctorProfileResponse>(
    `/doctors/${doctorId}`,
  );
  return response.data;
};
