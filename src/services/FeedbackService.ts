import { OnsiteCancelReasonType } from '../types/Consultation';
import { SelectedContent } from '../types/Feedback';
import {
  GenderType,
  Granularity,
  TimePeriodType,
  TreatmentType,
} from '../types/Share';
import api from './ApiService';

export interface IGetSingleFeedbackRequest {
  feedbackId: string;
}

export interface IGetSingleFeedbackResponse {
  id: string;
  receivedDate: string;
  receivedAt: Date;
  feedbackRating: number;
  selectedContent: SelectedContent;
  detailedContent: string | null;
  consultation: {
    id: string;
    consultationDate: string;
    consultationTimePeriod: TimePeriodType;
    onsiteCancelAt: Date | null;
    onsiteCancelReason: OnsiteCancelReasonType | null;
    treatmentType: TreatmentType;
  };
  doctor: {
    firstName: string;
    lastName: string;
    gender: GenderType;
  };
  patient: {
    firstName: string;
    lastName: string;
    gender: GenderType;
  };
}

export interface IGetFeedbackListRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientName?: string;
  patientId?: string;
  feedbackRating?: number;
  page: number;
  limit: number;
}

export interface IGetFeedbackListResponse {
  data: Array<{
    doctor: {
      firstName: string;
      lastName: string;
      gender: GenderType;
    };
    patient: {
      firstName: string;
      lastName: string;
      gender: GenderType;
    };
    id: string;
    receivedDate: string;
    receivedAt: Date;
    feedbackRating: number;
    clinicId: string;
    clinicName: string;
    consultationTimePeriod: TimePeriodType;
    consultationId: string;
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

export interface IGetFeedbackCountAndRateRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  granularity?: Granularity;
}

export interface IGetFeedbackCountAndRateResponse {
  totalFeedbacks: number;
  oneStarFeedbackCount: number;
  twoStarFeedbackCount: number;
  threeStarFeedbackCount: number;
  fourStarFeedbackCount: number;
  fiveStarFeedbackCount: number;
  oneStarFeedbackRate: number;
  twoStarFeedbackRate: number;
  threeStarFeedbackRate: number;
  fourStarFeedbackRate: number;
  fiveStarFeedbackRate: number;
  data: Array<{
    date: string;
    feedbackCount: number;
    oneStarFeedbackCount: number;
    twoStarFeedbackCount: number;
    threeStarFeedbackCount: number;
    fourStarFeedbackCount: number;
    fiveStarFeedbackCount: number;
    oneStarFeedbackRate: number;
    twoStarFeedbackRate: number;
    threeStarFeedbackRate: number;
    fourStarFeedbackRate: number;
    fiveStarFeedbackRate: number;
    totalReasonsCount: number;
    waitAcupunctureReason: number;
    waitBedReason: number;
    waitConsultationReason: number;
    waitMedicineReason: number;
    doctorPoorAttitude: number;
    waitAcupunctureReasonRate: number;
    waitBedReasonRate: number;
    waitConsultationReasonRate: number;
    waitMedicineReasonRate: number;
    doctorPoorAttitudeRate: number;
  }>;
}

export const getFeedbackList = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetFeedbackListResponse> => {
  const response = await api.get(`/feedbacks?${queryString}`);
  return response.data;
};

export const getSingleFeedback = async ({
  feedbackId,
}: IGetSingleFeedbackRequest): Promise<IGetSingleFeedbackResponse> => {
  const response = await api.get<IGetSingleFeedbackResponse>(
    `/feedbacks/${feedbackId}`,
  );
  return response.data;
};

export const getFeedbackCountAndRate = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetFeedbackCountAndRateResponse> => {
  const response = await api.get(`/feedbacks/related_ratios?${queryString}`);
  return response.data;
};
