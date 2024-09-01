import queryString from 'query-string';
import api from './ApiService';
import {
  GenderType,
  Granularity,
  TimePeriodType,
  TreatmentType,
} from '../types/Share';
import {
  ConsultationStatus,
  OnsiteCancelReasonType,
} from '../types/Consultation';
import { RoomNumberType } from '../types/ConsultationRoom';

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
  lastTotalCount: number;
  lastAverageCount: number;
  lastTotalSlots: number;
  compareTotalCount: number;
  compareAverageCount: number;
  compareSlots: number;
  isTotalGetMore: boolean;
  isAverageGetMore: boolean;
  compareTotalRate: number;
  compareAverageRate: number;
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

export interface IGetConsultationOnsiteCanceledCountAndRateRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

export interface IGetConsultationOnsiteCanceledCountAndRateResponse {
  lastConsultations: number;
  lastConsultationWithOnsiteCancel: number;
  lastOnsiteCancelRate: number;
  totalConsultations: number;
  consultationWithOnsiteCancel: number;
  onsiteCancelRate: number;
  compareConsultations: number;
  compareConsultationWithOnsiteCancel: number;
  compareOsiteCancelRates: number;
  isCutDown: boolean;
  data: Array<{
    date: string;
    onsiteCancelCount: number;
    consultationCount: number;
    onsiteCancelRate: number;
  }>;
}

export interface IGetConsultationBookingCountAndRateRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

export interface IGetConsultationBookingCountAndRateResponse {
  lastConsultations: number;
  lastConsultationWithBooking: number;
  lastConsiteBookingRate: number;
  totalConsultations: number;
  consultationWithOnlineBooking: number;
  onlineBookingRate: number;
  compareConsultations: number;
  compareConsultationWithBooking: number;
  compareBookingRates: number;
  isGetMore: boolean;
  data: Array<{
    date: string;
    onlineBookingCount: number;
    consultationCount: number;
    onlineBookingRate: number;
  }>;
}

export interface IGetFirstTimeConsultationCountAndRateRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  granularity?: Granularity;
}

export interface IGetFirstTimeConsultationCountAndRateResponse {
  lastConsultations: number;
  lastFirstTimeConsultationCount: number;
  lastFirstTimeConsultationRate: number;
  firstTimeConsultationCount: number;
  firstTimeConsultationRate: number;
  totalConsultations: number;
  compareConsultations: number;
  compareFirstTimeConsultation: number;
  compareFirstTimeRates: number;
  isGetMore: boolean;
  data: Array<{
    date: string;
    firstTimeCount: number;
    consultationCount: number;
    firstTimeRate: number;
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
  lastTotalConsultations: number;
  lastTotalConsultationWithAcupuncture: number;
  lastTotalConsultationWithMedicine: number;
  lastTotalConsultationWithBothTreatment: number;
  lastTotalOnlyAcupunctureCount: number;
  lastTotalOnlyMedicineCount: number;
  lastTotalAcupunctureRate: number;
  lastTotalMedicineRate: number;
  lastOnlyAcupunctureRate: number;
  lastOnlyMedicineRate: number;
  lastBothTreatmentRate: number;
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
  compareTotalConsultations: number;
  compareTotalConsultationWithAcupuncture: number;
  compareTotalConsultationWithMedicine: number;
  compareTotalConsultationWithBothTreatment: number;
  compareTotalOnlyAcupunctureCount: number;
  compareTotalOnlyMedicineCount: number;
  compareTotalAcupunctureRate: number;
  compareTotalMedicineRate: number;
  compareTotalOnlyAcupunctureRate: number;
  compareTotalOnlyMedicineRate: number;
  compareTotalBothTreatmentRate: number;
  isWithAcupunctureGetMore: boolean;
  isWithMedicineGetMore: boolean;
  isWithBothGetMore: boolean;
  isOnlyAcupunctureGetMore: boolean;
  isOnlyMedicineGetMore: boolean;
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
  lastAverageConsultationWait: number;
  lastAverageBedAssignmentWait: number;
  lastAverageAcupunctureWait: number;
  lastAverageNeedleRemovalWait: number;
  lastAverageMedicationWait: number;
  totalAverageConsultationWait: number;
  totalAverageBedAssignmentWait: number;
  totalAverageAcupunctureWait: number;
  totalAverageNeedleRemovalWait: number;
  totalAverageMedicationWait: number;
  compareAverageConsultationWait: number;
  compareAverageBedAssignmentWait: number;
  compareAverageAcupunctureWait: number;
  compareAverageNeedleRemovalWait: number;
  compareAverageMedicationWait: number;
  isAverageConsultationWaitCutDown: boolean;
  isAverageBedAssignmentWaitCutDown: boolean;
  isAverageAcupunctureWaitCutDown: boolean;
  isAverageNeedleRemovalWaitCutDown: boolean;
  isAverageMedicationWaitCutDown: boolean;
  compareAverageConsultationWaitRate: number;
  compareAverageBedAssignmentWaitRate: number;
  compareAverageAcupunctureWaitRate: number;
  compareAverageNeedleRemovalWaitRate: number;
  compareAverageMedicationWaitRate: number;
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
    consultationRoomNumber?: RoomNumberType;
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
  onsiteCancelCount: number;
  clinicId: string | Array<{ clinicId: string }>;
  consultationRoomNumber:
    | RoomNumberType
    | Array<{ consultationRoomNumber: RoomNumberType }>;
  timePeriod: TimePeriodType | Array<{ timePeriod: string }> | null;
}

export interface IGetConsultationRealTimeListRequest {
  query: {
    clinicId?: string;
    consultationRoomNumber?: RoomNumberType;
    page: number;
    limit: number;
  };
}

export interface IGetConsultationRealTimeListResponse {
  data: Array<{
    id: string;
    isOnsiteCanceled: boolean;
    consultationNumber: number;
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
    status: ConsultationStatus;
    timeSlotId: string;
    clinicId: string;
    consultationRoomNumber: RoomNumberType;
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

export const getConsultationOnsiteCanceledCountAndRate = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetConsultationOnsiteCanceledCountAndRateResponse> => {
  const response =
    await api.get<IGetConsultationOnsiteCanceledCountAndRateResponse>(
      `/consultations/canceled?${queryString}`,
    );
  return response.data;
};

export const getConsultationBookingCountAndRate = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetConsultationBookingCountAndRateResponse> => {
  const response = await api.get<IGetConsultationBookingCountAndRateResponse>(
    `/consultations/booking?${queryString}`,
  );
  return response.data;
};

export const getFirstTimeConsultationCountAndRate = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetFirstTimeConsultationCountAndRateResponse> => {
  const response = await api.get<IGetFirstTimeConsultationCountAndRateResponse>(
    `/consultations/first_time?${queryString}`,
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

export const getConsultationRealTimeList = async (
  data: IGetConsultationRealTimeListRequest,
): Promise<IGetConsultationRealTimeListResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetConsultationRealTimeListResponse>(
    `/consultations/real_time_lists?${queries}`,
  );
  return response.data;
};
