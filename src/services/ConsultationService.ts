import queryString from 'query-string';
import api from './ApiService';
import { GenderType, TimePeriodType, TreatmentType } from '../types/Share';
import { OnsiteCancelReasonType } from '../types/Consultation';

export interface IGetSingleConsultationRequest {
  consultationId: string;
}

export interface IGetSingleConsultationResponse {
  id: string;
  consultationDate: string;
  consultationTimePeriod: TimePeriodType;
  consultationNumber: number;
  onsiteCancelAt: Date | null;
  onsiteCancelReason: OnsiteCancelReasonType | null;
  checkInAt: Date;
  startAt: Date | null;
  endAt: Date | null;
  checkOutAt: Date | null;
  treatmentType: TreatmentType;
  patient: {
    firstName: string;
    lastName: string;
    gender: GenderType;
    age: number;
  };
  doctor: {
    firstName: string;
    lastName: string;
    gender: GenderType;
  };
  acupunctureTreatment: {
    id: string | null;
    startAt: Date | null;
    endAt: Date | null;
    assignBedAt: Date | null;
    removeNeedleAt: Date | null;
  } | null;
  medicineTreatment: {
    id: string | null;
    getMedicineAt: Date | null;
  } | null;
}

export interface IGetConsultationListRequest {
  query: {
    startDate: string;
    endDate: string;
    clinicId?: string;
    timePeriod?: TimePeriodType;
    totalDurationMin?: number;
    totalDurationMax?: number;
    patientId?: string;
    doctorId?: string;
    page: number;
    limit: number;
  };
}

export interface IGetConsultationListResponse {
  data: Array<{
    id: string;
    isOnsiteCanceled: boolean | null;
    onsiteCancelReason: OnsiteCancelReasonType | null;
    consultationNumber: number;
    consultationDate: string;
    consultationTimePeriod: TimePeriodType;
    doctor: {
      firstName: string;
      lastName: string;
    };
    patient: {
      firstName: string;
      lastName: string;
      gender: GenderType;
      age: number;
    };
    treatmentType: TreatmentType;
    totalDuration: number;
  }>;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
  totalCounts: number;
}

export const getConsultationList = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetConsultationListResponse> => {
  const response = await api.get(`/consultations?${queryString}`);
  return response.data;
};

export const getSingleConsultation = async ({
  consultationId,
}: IGetSingleConsultationRequest): Promise<IGetSingleConsultationResponse> => {
  const response = await api.get<IGetSingleConsultationResponse>(
    `/consultations/${consultationId}`,
  );
  return response.data;
};
