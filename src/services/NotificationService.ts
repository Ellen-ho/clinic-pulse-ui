import queryString from 'query-string';

import api from './ApiService';
import { INotification } from '../types/Notifications';

interface IDeleteAllNotificationsResponse {
  deletedAt: Date;
}

interface IDeleteNotificationRequest {
  notificationId: string;
}

interface IDeleteNotificationResponse {
  deletedAt: Date;
}

interface IGetNotificationDetailsRequest {
  notificationId: string;
}

interface IGetNotificationDetailsResponse extends INotification {}

interface IGetNotificationHintsResponse {
  hasUnReadNotification: boolean;
}

interface IGetNotificationListRequest {
  query: {
    page: number;
    limit: number;
  };
}

interface IGetNotificationListResponse {
  data: Array<INotification> | null;
  pagination: {
    pages: number[];
    totalPage: number;
    currentPage: number;
    prev: number;
    next: number;
  };
}

interface IReadAllNotificationsResponse {
  updatedNotifications: Array<INotification>;
}

export const deleteAllNotifications =
  async (): Promise<IDeleteAllNotificationsResponse> => {
    const response = await api.delete<IDeleteAllNotificationsResponse>(
      '/notifications/all',
    );
    return response.data;
  };

export const deleteNotification = async (
  data: IDeleteNotificationRequest,
): Promise<IDeleteNotificationResponse> => {
  const response = await api.delete<IDeleteNotificationResponse>(
    `/notifications/${data.notificationId}`,
  );
  return response.data;
};

export const getNotificationHints =
  async (): Promise<IGetNotificationHintsResponse> => {
    const response = await api.get<IGetNotificationHintsResponse>(
      '/notifications/hints',
    );
    return response.data;
  };

export const getNotificationDetails = async (
  data: IGetNotificationDetailsRequest,
): Promise<IGetNotificationDetailsResponse> => {
  const response = await api.get<IGetNotificationDetailsResponse>(
    `/notifications/${data.notificationId}`,
  );
  return response.data;
};

export const getNotificationList = async (
  data: IGetNotificationListRequest,
): Promise<IGetNotificationListResponse> => {
  const queries = queryString.stringify(data.query);
  const response = await api.get<IGetNotificationListResponse>(
    `/notifications?${queries}`,
  );
  return response.data;
};

export const readAllNotifications =
  async (): Promise<IReadAllNotificationsResponse> => {
    const response = await api.patch<IReadAllNotificationsResponse>(
      '/notifications/read-all',
    );
    return response.data;
  };
