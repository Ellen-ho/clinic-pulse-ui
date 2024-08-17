import api from './ApiService';

export interface IGetDoctorsAndClinicsResponse {
  doctors: Array<{
    id: string;
    fullName: string;
  }>;
  clinics: Array<{
    id: string;
    name: string;
  }>;
}

export const getDoctorsAndClinics =
  async (): Promise<IGetDoctorsAndClinicsResponse> => {
    const response = await api.get<IGetDoctorsAndClinicsResponse>(
      '/commons/load_doctors_and_clinics',
    );

    return response.data;
  };
