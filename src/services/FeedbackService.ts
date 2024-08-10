import { GenderType, TimePeriodType } from '../types/Share';
import api from './ApiService';

interface IGetFeedbackListRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientId?: string;
  feedbackRating?: number;
  page: number;
  limit: number;
}

interface IGetFeedbackListResponse {
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
    receivedAt: Date;
    feedbackRating: number;
    clinicId: string;
    clinicName: string;
    consultationTimePeriod: TimePeriodType;
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

export const getFeedbackList = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetFeedbackListResponse> => {
  const response = await api.get(`/feedbacks?${queryString}`);
  return response.data;
};
