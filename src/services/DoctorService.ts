import api from './ApiService';

export interface IGetAllDoctorsResponse {
  doctors: Array<{
    id: string;
    fullName: string;
  }>;
}

export const getAllDoctors = async (): Promise<IGetAllDoctorsResponse> => {
  const response = await api.get<IGetAllDoctorsResponse>('/doctors');
  return response.data;
};
