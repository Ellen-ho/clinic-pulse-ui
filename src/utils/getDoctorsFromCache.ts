import { IDoctors } from '../types/Doctors';

interface IGetDoctorsFromCache {
  doctors: IDoctors[];
}

export const getDoctorsFromCache = (): IGetDoctorsFromCache | null => {
  const cachedDoctors = localStorage.getItem('doctors');
  return cachedDoctors ? JSON.parse(cachedDoctors) : null;
};
