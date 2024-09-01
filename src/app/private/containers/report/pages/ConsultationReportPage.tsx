import { Card, Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import TimeFilters from '../components/TimeFilters';
import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import AverageConsultationCountLineChart from '../components/AverageConsultationCountLineChart';
import { AuthContext } from '../../../../../context/AuthContext';
import TreatmentsBarChart from '../components/TreatmentsLineChart';
import AverageWaitingTimeBarChart from '../components/AverageWaitingTimeBarChart';
import CanceledConsultationChart from '../components/CanceledConsultationChart';
import BookingSourceConsultationChart from '../components/BookingSourceConsultationChart';

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

  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId || '';
  const isDoctor = state.doctorId != null;

  const [filters, setFilters] = useState<IFilters>({
    startDate: dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    clinicId: undefined,
    doctorId: isDoctor ? doctorId : undefined,
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
            <TimeFilters onApply={handleApplyFilters} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <AverageConsultationCountLineChart
                startDate={filters.startDate}
                endDate={filters.endDate}
                clinicId={filters.clinicId}
                doctorId={filters.doctorId}
                timePeriod={filters.timePeriod}
                granularity={filters.granularity}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <AverageWaitingTimeBarChart
                startDate={filters.startDate}
                endDate={filters.endDate}
                clinicId={filters.clinicId}
                doctorId={filters.doctorId}
                timePeriod={filters.timePeriod}
                granularity={filters.granularity}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <CanceledConsultationChart
                startDate={filters.startDate}
                endDate={filters.endDate}
                clinicId={filters.clinicId}
                doctorId={filters.doctorId}
                timePeriod={filters.timePeriod}
                granularity={filters.granularity}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <BookingSourceConsultationChart
                startDate={filters.startDate}
                endDate={filters.endDate}
                clinicId={filters.clinicId}
                doctorId={filters.doctorId}
                timePeriod={filters.timePeriod}
                granularity={filters.granularity}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              <TreatmentsBarChart
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
