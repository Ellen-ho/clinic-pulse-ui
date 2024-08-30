export interface IFullCalendarEvent {
  id: string;
  start: string | Date;
  end: string | Date;
  allDay: boolean;
  title: string;
  color: string;
  extendedProps: {
    doctorName: string;
    consultationRoom: string;
  };
}
