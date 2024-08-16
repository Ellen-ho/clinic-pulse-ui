import { IClinics } from '../types/Clinics';

interface IGetClinicsFromCache {
  clinics: IClinics[];
}

export const getClinicsFromCache = (): IGetClinicsFromCache | null => {
  const cachedClinics = localStorage.getItem('clinics');
  return cachedClinics ? JSON.parse(cachedClinics) : null;
};
