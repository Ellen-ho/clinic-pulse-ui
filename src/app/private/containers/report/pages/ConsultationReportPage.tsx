import { Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import TimeFilters from '../components/TimeFilters';
import { useState } from 'react';
import dayjs from 'dayjs';
import DifferentTreatmentsBarChart from '../components/DifferentTreatmentsConsultationBarChart';
import AverageWaitingTimeLineChart from '../components/AverageWaitingTimeBarChart';
import FeedbackBarChart from '../components/FeedbackBarChart';
import AverageConsultationCountLineChart from '../components/AverageConsultationCountLineChart';
import CanceledAndBookingLineChart from '../components/CanceledAndBookingConsultationLineChart';

interface IFilters {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity: Granularity;
}

const ConsultationReportPage: React.FC = () => {
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
        <SecondaryPageTop />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <TimeFilters
              onApply={handleApplyFilters}
              initialYear={currentYear}
              initialMonth={currentMonth}
              initialWeek={currentWeek}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AverageConsultationCountLineChart
              startDate={filters.startDate}
              endDate={filters.endDate}
              clinicId={filters.clinicId}
              doctorId={filters.doctorId}
              timePeriod={filters.timePeriod}
              granularity={filters.granularity}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AverageWaitingTimeLineChart
              startDate={filters.startDate}
              endDate={filters.endDate}
              clinicId={filters.clinicId}
              doctorId={filters.doctorId}
              timePeriod={filters.timePeriod}
              granularity={filters.granularity}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CanceledAndBookingLineChart
              startDate={filters.startDate}
              endDate={filters.endDate}
              clinicId={filters.clinicId}
              doctorId={filters.doctorId}
              timePeriod={filters.timePeriod}
              granularity={filters.granularity}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <DifferentTreatmentsBarChart
              startDate={filters.startDate}
              endDate={filters.endDate}
              clinicId={filters.clinicId}
              doctorId={filters.doctorId}
              timePeriod={filters.timePeriod}
              granularity={filters.granularity}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <FeedbackBarChart
              startDate={filters.startDate}
              endDate={filters.endDate}
              clinicId={filters.clinicId}
              doctorId={filters.doctorId}
              timePeriod={filters.timePeriod}
              granularity={filters.granularity}
            />
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationReportPage;
