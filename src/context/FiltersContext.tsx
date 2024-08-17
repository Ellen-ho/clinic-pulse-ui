import React, { createContext, useContext, useState, useEffect } from 'react';
import { IGetDoctorsAndClinicsResponse } from '../services/ShareService';

interface IFiltersContext {
  doctors: IGetDoctorsAndClinicsResponse['doctors'];
  clinics: IGetDoctorsAndClinicsResponse['clinics'];
  setDoctors: (doctors: IGetDoctorsAndClinicsResponse['doctors']) => void;
  setClinics: (clinics: IGetDoctorsAndClinicsResponse['clinics']) => void;
}

export const FiltersContext = createContext<IFiltersContext | undefined>(
  undefined,
);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFiltersContext must be used within a FiltersProvider');
  }
  return context;
};
