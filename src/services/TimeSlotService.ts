import { RoomNumberType } from '../types/ConsultationRoom';
import { TimePeriodType } from '../types/Share';
import api from './ApiService';

export interface ITimeSlot {
  id: string;
  startAt: Date;
  endAt: Date;
  timePeriod: TimePeriodType;
  clinicId: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  consultationRoom: {
    id: string;
    roomNumber: RoomNumberType;
  };
}

export interface IGetTimeSlotRequest {
  clinicId?: string;
}

export interface IGetTimeSlotResponse {
  timeSlots: ITimeSlot[];
}

export const getTimeSlot = async ({
  queryString,
}: {
  queryString: string;
}): Promise<IGetTimeSlotResponse> => {
  const response = await api.get(`/time-slots${queryString}`);
  return response.data;
};
