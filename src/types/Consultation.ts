import { GenderType, TimePeriodType, TreatmentType } from './Share';

export enum OnsiteCancelReasonType {
  LONG_WAITING_TIME = 'LONG_WAITING_TIME',
  SERVICE_DISSATISFACTION = 'SERVICE_DISSATISFACTION',
  PERSONAL_EMERGENCY = 'PERSONAL_EMERGENCY',
  NO_PARKING_SPACES = 'NO_PARKING_SPACES',
}

export enum ConsultationStatus {
  IN_CONSULTATION = 'IN_CONSULTATION',
  WAITING_FOR_CONSULTATION = 'WAITING_FOR_CONSULTATION',
  WAITING_FOR_BED_ASSIGNMENT = 'WAITING_FOR_BED_ASSIGNMENT',
  WAITING_FOR_ACUPUNCTURE_TREATMENT = 'WAITING_FOR_ACUPUNCTURE_TREATMENT',
  WAITING_FOR_NEEDLE_REMOVAL = 'WAITING_FOR_NEEDLE_REMOVAL',
  WAITING_FOR_GET_MEDICINE = 'WAITING_FOR_GET_MEDICINE',
  ONSITE_CANCEL = 'ONSITE_CANCEL',
  CHECK_OUT = 'CHECK_OUT',
  UNDERGOING_ACUPUNCTURE_TREATMENT = 'UNDERGOING_ACUPUNCTURE_TREATMENT',
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
