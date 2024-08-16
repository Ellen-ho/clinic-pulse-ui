import dayjs from 'dayjs';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import { useState } from 'react';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { Card, Grid } from '@mui/material';
import TimeFilters from '../components/TimeFilters';
import AverageWaitingTimeLineChart from '../components/AverageWaitingTimeBarChart';
import AverageConsultationCountLineChart from '../components/AverageConsultationCountLineChart';
import DifferentTreatmentsBarChart from '../components/DifferentTreatmentsConsultationBarChart';
import FeedbackBarChart from '../components/FeedbackBarChart';

interface IFilters {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity: Granularity;
}

const ConsultationReportPage: React.FC = () => {
  const cardStyle = { height: '350px', padding: '20px' };
  const currentYear = dayjs().year().toString();
  const currentMonth = (dayjs().month() + 1).toString().padStart(2, '0');
  const currentWeek = dayjs().isoWeek().toString();

  const [filters, setFilters] = useState<IFilters>({
    startDate: dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    clinicId: undefined,
    doctorId: undefined,
    timePeriod: undefined,
    granularity: Granularity.DAY,
  });

  const handleApplyFilters = (newFilters: {
    startDate: string;
    endDate: string;
    granularity: Granularity;
  }) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <TimeFilters
              onApply={handleApplyFilters}
              initialYear={currentYear}
              initialMonth={currentMonth}
              initialWeek={currentWeek}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <FeedbackBarChart
                startDate={filters.startDate}
                endDate={filters.endDate}
                clinicId={filters.clinicId}
                doctorId={filters.doctorId}
                timePeriod={filters.timePeriod}
                granularity={filters.granularity}
              />
            </Card>
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationReportPage;
