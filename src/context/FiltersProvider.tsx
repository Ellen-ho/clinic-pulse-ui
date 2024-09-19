import { useEffect, useState } from 'react';
import { FiltersContext } from './FiltersContext';
import {
  getDoctorsAndClinics,
  IGetDoctorsAndClinicsResponse,
} from '../services/ShareService';

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doctors, setDoctors] = useState<
    IGetDoctorsAndClinicsResponse['doctors']
  >([]);
  const [clinics, setClinics] = useState<
    IGetDoctorsAndClinicsResponse['clinics']
  >([]);

  useEffect(() => {
    const loadFilters = () => {
      const storedDoctors = localStorage.getItem('doctors');
      const storedClinics = localStorage.getItem('clinics');

      if (
        storedDoctors &&
        storedClinics &&
        storedDoctors !== 'undefined' &&
        storedClinics !== 'undefined'
      ) {
        setDoctors(JSON.parse(storedDoctors));
        setClinics(JSON.parse(storedClinics));
      } else {
        getDoctorsAndClinics()
          .then((response) => {
            setDoctors(response.doctors);
            setClinics(response.clinics);
            localStorage.setItem('doctors', JSON.stringify(response.doctors));
            localStorage.setItem('clinics', JSON.stringify(response.clinics));
          })
          .catch((error) => {
            console.error('Failed to load doctors and clinics:', error);
          });
      }
    };
    loadFilters();
  }, []);

  const handleSetDoctors = (
    doctors: IGetDoctorsAndClinicsResponse['doctors'],
  ) => {
    setDoctors(doctors);
    localStorage.setItem('doctors', JSON.stringify(doctors));
  };

  const handleSetClinics = (
    clinics: IGetDoctorsAndClinicsResponse['clinics'],
  ) => {
    setClinics(clinics);
    localStorage.setItem('clinics', JSON.stringify(clinics));
  };

  return (
    <FiltersContext.Provider
      value={{
        doctors,
        clinics,
        setDoctors: handleSetDoctors,
        setClinics: handleSetClinics,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
