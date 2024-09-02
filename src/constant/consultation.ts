import {
  ConsultationStatus,
  OnsiteCancelReasonType,
} from '../types/Consultation';
import { GenderType, TimePeriodType, TreatmentType } from '../types/Share';

export const ConsultationTimePeriodMap = {
  [TimePeriodType.MORNING_SESSION]: '早診',
  [TimePeriodType.AFTERNOON_SESSION]: '午診',
  [TimePeriodType.EVENING_SESSION]: '晚診',
};

export const GenderTypeMap = {
  [GenderType.MALE]: '男性',
  [GenderType.FEMALE]: '女性',
  [GenderType.NON_BINARY]: '非二元性別',
};

export const TreatmentTypeMap = {
  [TreatmentType.ACUPUNTURE_TREATMENT]: '針灸治療',
  [TreatmentType.MEDICINE_TREATMENT]: '藥物治療',
  [TreatmentType.BOTH_TREATMENT]: '針灸及藥物治療',
  [TreatmentType.NO_TREATMENT]: '無治療',
};

export const OnsiteCancelReasonMap = {
  [OnsiteCancelReasonType.LONG_WAITING_TIME]: '等待時間太長',
  [OnsiteCancelReasonType.SERVICE_DISSATISFACTION]: '診所人員態度不佳',
  [OnsiteCancelReasonType.PERSONAL_EMERGENCY]: '個人急事',
  [OnsiteCancelReasonType.NO_PARKING_SPACES]: '車子臨停',
};

export const ConsultationStatusMap = {
  [ConsultationStatus.WAITING_FOR_CONSULTATION]: '等待看診',
  [ConsultationStatus.IN_CONSULTATION]: '看診中',
  [ConsultationStatus.ONSITE_CANCEL]: '退掛',
  [ConsultationStatus.WAITING_FOR_ACUPUNCTURE_TREATMENT]: '等待針灸',
  [ConsultationStatus.WAITING_FOR_BED_ASSIGNMENT]: '等待安排治療床',
  [ConsultationStatus.WAITING_FOR_NEEDLE_REMOVAL]: '等待取針',
  [ConsultationStatus.WAITING_FOR_GET_MEDICINE]: '等待拿藥',
  [ConsultationStatus.CHECK_OUT]: '完成離開',
  [ConsultationStatus.UNDERGOING_ACUPUNCTURE_TREATMENT]: '針灸治療中',
};
