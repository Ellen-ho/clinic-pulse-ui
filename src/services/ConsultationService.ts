import queryString from 'query-string';
import api from './ApiService';
import {
  GenderType,
  Granularity,
  TimePeriodType,
  TreatmentType,
} from '../types/Share';
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
    patientName?: string;
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

export interface IGetAverageConsultationCountRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

export interface IGetAverageConsultationCountResponse {
  totalConsultations: number;
  totalSlots: number;
  averagePatientPerSlot: number;
  data: Array<{
    date: string;
    consultationCount: number;
    timeSlotCount: number;
    averageCount: number;
  }>;
}

export interface IGetConsultationOnsiteCanceledAndBookingRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

export interface IGetConsultationOnsiteCanceledAndBookingResponse {
  totalConsultations: number;
  consultationWithOnlineBooking: number;
  consultationWithOnsiteCancel: number;
  onlineBookingRate: number;
  onsiteCancelRate: number;
  data: Array<{
    date: string;
    onlineBookingCount: number;
    onsiteCancelCount: number;
    consultationCount: number;
    onlineBookingRate: number;
    onsiteCancelRate: number;
  }>;
}

export interface IGetDifferentTreatmentConsultationRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

export interface IGetDifferentTreatmentConsultationResponse {
  totalConsultations: number;
  totalConsultationWithAcupuncture: number;
  totalConsultationWithMedicine: number;
  totalConsultationWithBothTreatment: number;
  totalOnlyAcupunctureCount: number;
  totalOnlyMedicineCount: number;
  totalAcupunctureRate: number;
  totalMedicineRate: number;
  totalOnlyAcupunctureRate: number;
  totalOnlyMedicineRate: number;
  totalBothTreatmentRate: number;
  data: Array<{
    date: string;
    consultationCount: number;
    consultationWithAcupuncture: number;
    consultationWithMedicine: number;
    consultationWithBothTreatment: number;
    acupunctureRate: number;
    medicineRate: number;
    onlyAcupunctureCount: number;
    onlyMedicineCount: number;
    onlyAcupunctureRate: number;
    onlyMedicineRate: number;
    bothTreatmentRate: number;
  }>;
}

export interface IGetAverageWaitingTimeRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientId?: string;
  granularity?: Granularity;
}

export interface IGetAverageWaitingTimeResponse {
  totalAverageConsultationWait: number;
  totalAverageBedAssignmentWait: number;
  totalAverageAcupunctureWait: number;
  totalAverageNeedleRemovalWait: number;
  totalAverageMedicationWait: number;
  data: Array<{
    date: string;
    averageConsultationWait: number;
    averageBedAssignmentWait: number;
    averageAcupunctureWait: number;
    averageNeedleRemovalWait: number;
    averageMedicationWait: number;
  }>;
}

export interface IGetConsultationRealTimeCountRequest {
  query: {
    clinicId?: string;
    consultationRoomNumber?: string;
    doctorId?: string;
  };
}

export interface IGetConsultationRealTimeCountResponse {
  timeSlotId: string | Array<{ id: string }>;
  waitForConsultationCount: number;
  waitForBedAssignedCount: number;
  waitForAcupunctureTreatmentCount: number;
  waitForNeedleRemovedCount: number;
  waitForMedicineCount: number;
  completedCount: number;
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

export const getAverageConsultationCount = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetAverageConsultationCountResponse> => {
  const response = await api.get<IGetAverageConsultationCountResponse>(
    `/consultations/average_counts?${queryString}`,
  );
  return response.data;
};

export const getDifferentTreatmentConsultation = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetDifferentTreatmentConsultationResponse> => {
  const response = await api.get<IGetDifferentTreatmentConsultationResponse>(
    `/consultations/different_treatments?${queryString}`,
  );
  return response.data;
};

export const getConsultationOnsiteCanceledAndBooking = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetConsultationOnsiteCanceledAndBookingResponse> => {
  const response =
    await api.get<IGetConsultationOnsiteCanceledAndBookingResponse>(
      `/consultations/canceled_and_booking?${queryString}`,
    );
  return response.data;
};

export const getAverageWaitingTime = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetAverageWaitingTimeResponse> => {
  const response = await api.get<IGetAverageWaitingTimeResponse>(
    `/consultations/average_waiting_time?${queryString}`,
  );
  return response.data;
};

export const getConsultationRealTimeCount = async (
  data: IGetConsultationRealTimeCountRequest,
): Promise<IGetConsultationRealTimeCountResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetConsultationRealTimeCountResponse>(
    `/consultations/real_time_counts?${queries}`,
  );
  return response.data;
};
