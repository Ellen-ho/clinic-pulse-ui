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
