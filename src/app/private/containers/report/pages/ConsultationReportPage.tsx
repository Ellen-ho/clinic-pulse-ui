import { Box, Card, Grid } from '@mui/material';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import TimeFilters from '../components/TimeFilters';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AverageConsultationCountLineChart from '../components/AverageConsultationCountLineChart';
import { AuthContext } from '../../../../../context/AuthContext';
import TreatmentsBarChart from '../components/DifferentTreatmentsChart';
import AverageWaitingTimeBarChart from '../components/AverageWaitingTimeBarChart';
import CanceledConsultationChart from '../components/CanceledConsultationChart';
import BookingSourceConsultationChart from '../components/BookingSourceConsultationChart';
import FirstTimeChart from '../components/FirstTimeConsultationChart';
import ConsultationDescription from '../components/ConsultationCountDescription';
import {
  getAverageConsultationCount,
  getAverageWaitingTime,
  getConsultationBookingCountAndRate,
  getConsultationOnsiteCanceledCountAndRate,
  getDifferentTreatmentConsultation,
  getFirstTimeConsultationCountAndRate,
  IGetAverageConsultationCountResponse,
  IGetAverageWaitingTimeResponse,
  IGetConsultationBookingCountAndRateResponse,
  IGetConsultationOnsiteCanceledCountAndRateResponse,
  IGetDifferentTreatmentConsultationResponse,
  IGetFirstTimeConsultationCountAndRateResponse,
} from '../../../../../services/ConsultationService';
import WaitingTimeDescription from '../components/AverageWaitingTimeDescription';
import FirstTimeConsultationDescription from '../components/FirstTimeConsultationDescription';
import FirstTimeConsultationChart from '../components/FirstTimeConsultationChart';
import DifferentTreatmentsChart from '../components/DifferentTreatmentsChart';
import BookingSourceDescription from '../components/BookingSourceDescription';
import CanceledDescription from '../components/CanceledDescription';
import DifferentTreatmentsConsultationDescription from '../components/DifferentTreatmentsConsultationDescription';

interface IFilters {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity: Granularity;
}

const ConsultationReportPage: React.FC = () => {
  const cardStyle = { padding: '20px' };
  const chartStyle = { height: '300px' };

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

  const [averageConsultationData, setAverageConsultationData] =
    useState<IGetAverageConsultationCountResponse | null>(null);
  const [averageWaitingTimeData, setAverageWaitingTimeData] =
    useState<IGetAverageWaitingTimeResponse | null>(null);
  const [bookingSourceData, setBookingSourceData] =
    useState<IGetConsultationBookingCountAndRateResponse | null>(null);
  const [canceledData, setCanceledData] =
    useState<IGetConsultationOnsiteCanceledCountAndRateResponse | null>(null);
  const [firstTimeConsultationData, setFirstTimeConsultationData] =
    useState<IGetFirstTimeConsultationCountAndRateResponse | null>(null);
  const [differentTreatmentData, setDifferentTreatmentData] =
    useState<IGetDifferentTreatmentConsultationResponse | null>(null);

  const buildQueryString = (filters: IFilters) => {
    const params = new URLSearchParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      granularity: filters.granularity,
    });

    if (filters.clinicId) params.set('clinicId', filters.clinicId);
    if (filters.doctorId) params.set('doctorId', filters.doctorId);
    if (filters.timePeriod) params.set('timePeriod', filters.timePeriod);

    return params.toString();
  };

  useEffect(() => {
    const fetchConsultationData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getAverageConsultationCount({ queryString });
      setAverageConsultationData(responseData);
    };

    const fetchWaitingTimeData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getAverageWaitingTime({ queryString });
      setAverageWaitingTimeData(responseData);
    };

    const fetchBookingSourceData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getConsultationBookingCountAndRate({
        queryString,
      });
      setBookingSourceData(responseData);
    };

    const fetchCanceledData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getConsultationOnsiteCanceledCountAndRate({
        queryString,
      });
      setCanceledData(responseData);
    };

    const fetchFirstTimeConsultationData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getFirstTimeConsultationCountAndRate({
        queryString,
      });
      setFirstTimeConsultationData(responseData);
    };

    const fetchDifferentTreatmentData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getDifferentTreatmentConsultation({
        queryString,
      });
      setDifferentTreatmentData(responseData);
    };

    fetchConsultationData();
    fetchBookingSourceData();
    fetchCanceledData();
    fetchFirstTimeConsultationData();
    fetchWaitingTimeData();
    fetchDifferentTreatmentData();
  }, [filters]);

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
        <Grid container spacing={1} sx={{ paddingBottom: '20px' }}>
          <Grid item xs={12} md={12} lg={12}>
            <TimeFilters onApply={handleApplyFilters} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {averageConsultationData && (
                <>
                  <ConsultationDescription
                    title="患者總人數和平均每診人數"
                    color="#f3faff"
                    totalConsultations={
                      averageConsultationData.totalConsultations
                    }
                    totalSlots={averageConsultationData.totalSlots}
                    averagePatientPerSlot={
                      averageConsultationData.averagePatientPerSlot
                    }
                    compareTotalRate={averageConsultationData.compareTotalRate}
                    compareAverageRate={
                      averageConsultationData.compareAverageRate
                    }
                    compareSlotRate={averageConsultationData.compareSlots}
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <AverageConsultationCountLineChart
                      data={averageConsultationData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {firstTimeConsultationData && (
                <>
                  <FirstTimeConsultationDescription
                    title="初診人數和初診率"
                    color="#f3faff"
                    firstTimeConsultationCount={
                      firstTimeConsultationData.firstTimeConsultationCount
                    }
                    firstTimeConsultationRate={
                      firstTimeConsultationData.firstTimeConsultationRate
                    }
                    compareFirstTimeConsultation={
                      firstTimeConsultationData.compareFirstTimeConsultation
                    }
                    compareFirstTimeRates={
                      firstTimeConsultationData.compareFirstTimeRates
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <FirstTimeConsultationChart
                      data={firstTimeConsultationData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {bookingSourceData && (
                <>
                  <BookingSourceDescription
                    title="線上預約人數和線上預約率"
                    color="#f3faff"
                    consultationWithOnlineBooking={
                      bookingSourceData.consultationWithOnlineBooking
                    }
                    onlineBookingRate={bookingSourceData.onlineBookingRate}
                    compareConsultationWithBooking={
                      bookingSourceData.compareConsultationWithBooking
                    }
                    compareBookingRates={bookingSourceData.compareBookingRates}
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <BookingSourceConsultationChart
                      data={bookingSourceData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {canceledData && (
                <>
                  <CanceledDescription
                    title="退掛號人數和退掛號率"
                    color="#f3faff"
                    consultationWithOnsiteCancel={
                      canceledData.consultationWithOnsiteCancel
                    }
                    onsiteCancelRate={canceledData.onsiteCancelRate}
                    compareConsultationWithOnsiteCancel={
                      canceledData.compareConsultationWithOnsiteCancel
                    }
                    compareOsiteCancelRates={
                      canceledData.compareOsiteCancelRates
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <CanceledConsultationChart
                      data={canceledData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {averageWaitingTimeData && (
                <>
                  <WaitingTimeDescription
                    title="平均等待時間"
                    color="#f3faff"
                    totalAverageConsultationWait={
                      averageWaitingTimeData.totalAverageConsultationWait
                    }
                    totalAverageBedAssignmentWait={
                      averageWaitingTimeData.totalAverageBedAssignmentWait
                    }
                    totalAverageAcupunctureWait={
                      averageWaitingTimeData.totalAverageAcupunctureWait
                    }
                    totalAverageNeedleRemovalWait={
                      averageWaitingTimeData.totalAverageNeedleRemovalWait
                    }
                    totalAverageMedicationWait={
                      averageWaitingTimeData.totalAverageMedicationWait
                    }
                    compareAverageConsultationWaitRate={
                      averageWaitingTimeData.compareAverageConsultationWaitRate
                    }
                    compareAverageBedAssignmentWaitRate={
                      averageWaitingTimeData.compareAverageBedAssignmentWaitRate
                    }
                    compareAverageAcupunctureWaitRate={
                      averageWaitingTimeData.compareAverageAcupunctureWaitRate
                    }
                    compareAverageNeedleRemovalWaitRate={
                      averageWaitingTimeData.compareAverageNeedleRemovalWaitRate
                    }
                    compareAverageMedicationWaitRate={
                      averageWaitingTimeData.compareAverageMedicationWaitRate
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <AverageWaitingTimeBarChart
                      data={averageWaitingTimeData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {differentTreatmentData && (
                <>
                  <DifferentTreatmentsConsultationDescription
                    title="針灸及藥物治療人數和比率"
                    color="#f3faff"
                    totalConsultationWithBothTreatment={
                      differentTreatmentData.totalConsultationWithBothTreatment
                    }
                    totalOnlyAcupunctureCount={
                      differentTreatmentData.totalOnlyAcupunctureCount
                    }
                    totalOnlyMedicineCount={
                      differentTreatmentData.totalOnlyMedicineCount
                    }
                    totalOnlyAcupunctureRate={
                      differentTreatmentData.totalOnlyAcupunctureRate
                    }
                    totalOnlyMedicineRate={
                      differentTreatmentData.totalOnlyMedicineRate
                    }
                    totalBothTreatmentRate={
                      differentTreatmentData.totalBothTreatmentRate
                    }
                    compareTotalConsultationWithBothTreatment={
                      differentTreatmentData.compareTotalConsultationWithBothTreatment
                    }
                    compareTotalOnlyAcupunctureCount={
                      differentTreatmentData.compareTotalOnlyAcupunctureCount
                    }
                    compareTotalOnlyMedicineCount={
                      differentTreatmentData.compareTotalOnlyMedicineCount
                    }
                    compareTotalOnlyAcupunctureRate={
                      differentTreatmentData.compareTotalOnlyAcupunctureRate
                    }
                    compareTotalOnlyMedicineRate={
                      differentTreatmentData.compareTotalOnlyMedicineRate
                    }
                    compareTotalBothTreatmentRate={
                      differentTreatmentData.compareTotalBothTreatmentRate
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <DifferentTreatmentsChart
                      data={differentTreatmentData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationReportPage;
