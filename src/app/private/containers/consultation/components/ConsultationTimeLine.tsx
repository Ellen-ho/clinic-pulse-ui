import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import { IConsultationDetail } from '../../../../../types/Consultation';

interface ConsultationTimelineProps {
  consultation: IConsultationDetail;
}

const ConsultationTimeline: React.FC<ConsultationTimelineProps> = ({
  consultation,
}) => {
  const events = [
    { time: consultation.checkInAt, label: '報到' },
    { time: consultation.startAt, label: '開始看診' },
    { time: consultation.endAt, label: '結束看診' },
    { time: consultation.onsiteCancelAt, label: '退掛' },
    {
      time: consultation.acupunctureTreatment?.startAt,
      label: '開始針灸',
    },
    {
      time: consultation.acupunctureTreatment?.endAt,
      label: '結束針灸',
    },
    {
      time: consultation.acupunctureTreatment?.assignBedAt,
      label: '排床',
    },
    {
      time: consultation.acupunctureTreatment?.removeNeedleAt,
      label: '拔針',
    },
    {
      time: consultation.medicineTreatment?.getMedicineAt,
      label: '拿藥',
    },
    { time: consultation.checkOutAt, label: '離開' },
  ];

  return (
    <Timeline position="alternate">
      {events.map((event, index) =>
        event.time ? (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary">
              {dateFormatter(new Date(event.time).toISOString())}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{event.label}</TimelineContent>
          </TimelineItem>
        ) : null,
      )}
    </Timeline>
  );
};
export default ConsultationTimeline;
