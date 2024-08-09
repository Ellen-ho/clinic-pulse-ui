import { GenderType, TimePeriodType, TreatmentType } from './Share';

export enum OnsiteCancelReasonType {
  LONG_WAITING_TIME = 'LONG_WAITING_TIME',
  SERVICE_DISSATISFACTION = 'SERVICE_DISSATISFACTION',
  PERSONAL_EMERGENCY = 'PERSONAL_EMERGENCY',
  NO_PARKING_SPACES = 'NO_PARKING_SPACES',
}

export interface IConsultationListItem {
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
}

export interface IConsultationDetail {
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
