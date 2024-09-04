import { Granularity } from '../types/Share';
import api from './ApiService';

export interface IGetSingleReviewRequest {
  reviewId: string;
}

export interface IGetSingleReviewResponse {
  id: string;
  link: string;
  reviewRating: number;
  receivedDate: string;
  receivedAt: Date;
  reviewDateOfLastEdit: Date | null;
  reviewerName: string;
  snippet: string | null;
  extractedSnippet: string | null;
  likes: number | null;
  responseDate: string | null;
  responseAt: Date | null;
  responseDateOfLastEdit: Date | null;
  responseSnippet: string | null;
  responseExtractedSnippet: string | null;
  clinicId: string;
}

export interface IGetReviewListRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  patientName?: string;
  reviewRating?: number;
  page: number;
  limit: number;
}

export interface IGetReviewListResponse {
  data: Array<{
    id: string;
    link: string;
    receivedDate: string;
    receivedDateOfLastEdit: string | null;
    reviewRating: number;
    clinicId: string;
    clinicName: string;
    reviewer: {
      name: string;
    };
    response: {
      responseDate: string | null;
      responseDateOfLastEdit: string | null;
    };
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

export interface IGetReviewCountAndRateRequest {
  startDate: string;
  endDate: string;
  clinicId?: string;
  granularity?: Granularity;
}

export interface IGetReviewCountAndRateResponse {
  lastTotalReviews: number;
  lastOneStarReviewCount: number;
  lastTwoStarReviewCount: number;
  lastThreeStarReviewCount: number;
  lastFourStarReviewCount: number;
  lastFiveStarReviewCount: number;
  totalReviews: number;
  oneStarReviewCount: number;
  twoStarReviewCount: number;
  threeStarReviewCount: number;
  fourStarReviewCount: number;
  fiveStarReviewCount: number;
  oneStarReviewRate: number;
  twoStarReviewRate: number;
  threeStarReviewRate: number;
  fourStarReviewRate: number;
  fiveStarReviewRate: number;
  compareTotalReviews: number;
  compareOneStarReviewCount: number;
  compareTwoStarReviewCount: number;
  compareThreeStarReviewCount: number;
  compareFourStarReviewCount: number;
  compareFiveStarReviewCount: number;
  data: Array<{
    date: string;
    reviewCount: number;
    oneStarReviewCount: number;
    twoStarReviewCount: number;
    threeStarReviewCount: number;
    fourStarReviewCount: number;
    fiveStarReviewCount: number;
    oneStarReviewRate: number;
    twoStarReviewRate: number;
    threeStarReviewRate: number;
    fourStarReviewRate: number;
    fiveStarReviewRate: number;
  }>;
}

export const getReviewList = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetReviewListResponse> => {
  const response = await api.get(`/reviews?${queryString}`);
  return response.data;
};

export const getSingleReview = async ({
  reviewId,
}: IGetSingleReviewRequest): Promise<IGetSingleReviewResponse> => {
  const response = await api.get<IGetSingleReviewResponse>(
    `/reviews/${reviewId}`,
  );
  return response.data;
};

export const getReviewCountAndRate = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetReviewCountAndRateResponse> => {
  const response = await api.get(`/reviews/related_ratios?${queryString}`);
  return response.data;
};
