import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Typography } from '@mui/material';
import { TimePeriodType } from '../../../../../types/Share';
import {
  getTimeSlot,
  ITimeSlot,
} from '../../../../../services/TimeSlotService';
import { CalendarContainer } from './TimeSlotCalendar.styled';
import zhTwLocale from '@fullcalendar/core/locales/zh-tw';

interface CalendarProps {
  clinicId?: string;
}

interface IFullCalendarEvent {
  id: string;
  start: Date;
  end: Date;
  allDay: boolean;
  title: string;
  color: string;
  extendedProps: {
    doctorName: string;
    consultationRoom: string;
    timePeriod: TimePeriodType;
  };
}

const getColorBasedOnTimePeriod = (timePeriod: TimePeriodType): string => {
  switch (timePeriod) {
    case TimePeriodType.MORNING_SESSION:
      return '#F0FBFF';
    case TimePeriodType.AFTERNOON_SESSION:
      return '#F2F0FF';
    case TimePeriodType.EVENING_SESSION:
      return '#FFECEC';
    default:
      return '#9E9E9E';
  }
};

const getRoomDisplayName = (roomNumber: string): string => {
  switch (roomNumber) {
    case '1':
      return '一診';
    case '2':
      return '二診';
    default:
      return `Room ${roomNumber}`;
  }
};

const getRoomOrder = (roomNumber: string): number => {
  switch (roomNumber) {
    case '1':
      return 1;
    case '2':
      return 2;
    default:
      return 3;
  }
};

const formatTimeSlotsToEvents = (
  timeSlots: ITimeSlot[],
): IFullCalendarEvent[] => {
  return timeSlots.map((slot) => ({
    id: slot.id,
    start: new Date(slot.startAt),
    end: new Date(slot.endAt),
    allDay: false,
    title: `${slot.doctor.lastName}${
      slot.doctor.firstName
    } - ${getRoomDisplayName(slot.consultationRoom.roomNumber)}`,
    color: getColorBasedOnTimePeriod(slot.timePeriod),
    roomOrder: getRoomOrder(slot.consultationRoom.roomNumber),
    extendedProps: {
      doctorName: `${slot.doctor.lastName}${slot.doctor.firstName}`,
      consultationRoom: getRoomDisplayName(slot.consultationRoom.roomNumber),
      timePeriod: slot.timePeriod,
    },
  }));
};

const renderSessionHeader = (
  sessionName: string,
  timeRange: string,
  backgroundColor: string,
) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
      textAlign: 'center',
      border: `2px solid ${backgroundColor}`,
      borderRadius: '8px',
      backgroundColor: `${backgroundColor}20`,
      padding: '8px',
      marginBottom: '4px',
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {sessionName} {timeRange}
    </Typography>
  </Box>
);

const renderEventContent = (
  eventInfo: any,
  displayedSessions: Set<string>,
  viewType: string,
) => {
  const { timePeriod, doctorName, consultationRoom } =
    eventInfo.event.extendedProps;

  const getSessionDetails = (timePeriod: TimePeriodType) => {
    switch (timePeriod) {
      case TimePeriodType.MORNING_SESSION:
        return { name: '早診', timeRange: '8:30 am ~ 12:00 pm' };
      case TimePeriodType.AFTERNOON_SESSION:
        return { name: '午診', timeRange: '2:30 pm ~ 5:30 pm' };
      case TimePeriodType.EVENING_SESSION:
        return { name: '晚診', timeRange: '6:30 pm ~ 9:30 pm' };
      default:
        return { name: '', timeRange: '' };
    }
  };

  const { name: sessionName, timeRange } = getSessionDetails(timePeriod);
  const sessionKey = `${eventInfo.event.startStr}-${timePeriod}`;

  const showSessionHeader =
    !displayedSessions.has(sessionKey) && viewType === 'dayGridMonth';

  if (showSessionHeader) {
    displayedSessions.add(sessionKey);
  }

  return (
    <Box>
      {viewType === 'dayGridMonth' &&
        showSessionHeader &&
        renderSessionHeader(sessionName, timeRange, eventInfo.backgroundColor)}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems:
            viewType === 'timeGridWeek' || viewType === 'timeGridDay'
              ? 'flex-start'
              : 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign:
            viewType === 'timeGridWeek' || viewType === 'timeGridDay'
              ? 'left'
              : 'center',
          border: `2px solid ${eventInfo.backgroundColor}`,
          borderRadius: '8px',
          backgroundColor: `${eventInfo.backgroundColor}20`,
          padding: '8px',
          order: consultationRoom === '一診' ? 1 : 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {eventInfo.event.title}
        </Typography>
      </Box>
    </Box>
  );
};

const TimeSlotCalendar: React.FC<CalendarProps> = ({ clinicId }) => {
  const [events, setEvents] = useState<IFullCalendarEvent[]>([]);
  const [currentViewType, setCurrentViewType] =
    useState<string>('dayGridMonth');

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!clinicId) return;
      try {
        const queryString = `?clinicId=${clinicId}`;
        const { timeSlots } = await getTimeSlot({ queryString });
        const formattedEvents = formatTimeSlotsToEvents(timeSlots);
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    fetchTimeSlots();
  }, [clinicId]);

  const displayedSessions = new Set<string>();

  const handleViewDidMount = (view: { view: { type: string } }) => {
    const calendarEl = document.querySelector('.fc') as HTMLElement | null;
    setCurrentViewType(view.view.type);
    if (view.view.type === 'timeGridWeek' || view.view.type === 'timeGridDay') {
      if (calendarEl) {
        calendarEl.style.textAlign = 'left';
      }
    } else {
      if (calendarEl) {
        calendarEl.style.textAlign = '';
      }
    }
  };

  return (
    <Box margin="1rem">
      <CalendarContainer>
        <FullCalendar
          timeZone="UTC"
          locale="zh-tw"
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: '今天',
            month: '月',
            week: '週',
            day: '日',
          }}
          allDayText="整天"
          events={events}
          eventOrder={['start', 'roomOrder']}
          eventContent={(eventInfo) =>
            renderEventContent(eventInfo, displayedSessions, currentViewType)
          }
          dayMaxEvents={true}
          height="auto"
          eventDisplay="block"
          viewDidMount={handleViewDidMount}
        />
      </CalendarContainer>
    </Box>
  );
};

export default TimeSlotCalendar;
