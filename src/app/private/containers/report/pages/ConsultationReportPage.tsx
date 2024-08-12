import { Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import TimeFilters from '../components/TimeFilters';
import { useState } from 'react';
import dayjs from 'dayjs';
import AverageConsultationCountLineChart from '../components/AverageConsultationCountLineChart';

const ConsultationReportPage: React.FC = () => {
  const currentYear = dayjs().year().toString();
  const currentMonth = (dayjs().month() + 1).toString().padStart(2, '0');
  const currentWeek = dayjs().isoWeek().toString();

  const [filters, setFilters] = useState({
    startDate: dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    clinicId: '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
    doctorId: '008ce240-3f25-4e2a-a3e2-d62f5e20fe71',
    timePeriod: TimePeriodType.MORNING_SESSION,
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
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationReportPage;
