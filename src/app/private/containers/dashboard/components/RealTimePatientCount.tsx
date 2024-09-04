import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import {
  getConsultationRealTimeCount,
  IGetConsultationRealTimeCountRequest,
  IGetConsultationRealTimeCountResponse,
} from '../../../../../services/ConsultationService';
import BasicCard from '../../../../../components/card/BasicCard';
import { Box, Grid, Typography } from '@mui/material';
import CountUp from 'react-countup';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { FaRegCalendarTimes } from 'react-icons/fa';
import DataLoading from '../../../../../components/signs/DataLoading';
import { UserRoleType } from '../../../../../types/Users';
import useRealTimeSocket from '../../../../../hooks/UseRealTimeSocket';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import { TimePeriodType } from '../../../../../types/Share';
import { RoomNumberType } from '../../../../../types/ConsultationRoom';
interface StatBoxProps {
  title: string;
  value: number;
  duration: number;
}
const StatBox: React.FC<StatBoxProps> = ({ title, value, duration }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      boxShadow: 1,
      backgroundColor: 'background.paper',
      width: '100%',
    }}
  >
    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="h3" color="text.primary" sx={{ mb: 1 }}>
      <CountUp start={0} end={value} duration={duration} />
    </Typography>
  </Box>
);

interface IRealConsultationStatisticProps {
  clinicId?: string;
  consultationRoomNumber?: RoomNumberType;
}

const RealConsultationStatistic: React.FC<IRealConsultationStatisticProps> = ({
  clinicId,
  consultationRoomNumber,
}) => {
  const [realTimeData, setRealTimeData] =
    useState<IGetConsultationRealTimeCountResponse>({
      timeSlotId: [],
      waitForConsultationCount: 0,
      waitForBedAssignedCount: 0,
      waitForAcupunctureTreatmentCount: 0,
      waitForNeedleRemovedCount: 0,
      waitForMedicineCount: 0,
      completedCount: 0,
      onsiteCancelCount: 0,
      clinicId: [],
      consultationRoomNumber: [],
      timePeriod: null,
    });
  const title = '即時資料';
  const { state } = useContext(AuthContext);
  const currentUser = state.currentUser;

  const shouldFetch =
    currentUser?.role === UserRoleType.DOCTOR ||
    (currentUser?.role === UserRoleType.ADMIN && clinicId !== undefined);

  useRealTimeSocket({ clinicId, consultationRoomNumber, setRealTimeData });

  const { isLoading } = useSWR(
    shouldFetch
      ? ['getConsultationRealTimeCount', clinicId, consultationRoomNumber]
      : null,
    () => {
      const query: any = {};

      if (clinicId) query.clinicId = clinicId;
      if (consultationRoomNumber)
        query.consultationRoomNumber = consultationRoomNumber;
      return getConsultationRealTimeCount({
        query,
        currentUser,
      } as IGetConsultationRealTimeCountRequest);
    },
    {
      onSuccess: (data) => {
        const {
          timeSlotId,
          waitForConsultationCount,
          waitForBedAssignedCount,
          waitForAcupunctureTreatmentCount,
          waitForNeedleRemovedCount,
          waitForMedicineCount,
          completedCount,
          onsiteCancelCount,
          clinicId,
          consultationRoomNumber,
          timePeriod,
        } = data;

        const validTimePeriod =
          Array.isArray(timePeriod) && timePeriod.length > 0
            ? (timePeriod[0].timePeriod as TimePeriodType)
            : (timePeriod as TimePeriodType);

        setRealTimeData({
          timeSlotId,
          waitForConsultationCount,
          waitForBedAssignedCount,
          waitForAcupunctureTreatmentCount,
          waitForNeedleRemovedCount,
          waitForMedicineCount,
          completedCount,
          onsiteCancelCount,
          clinicId,
          consultationRoomNumber,
          timePeriod: validTimePeriod,
        });
      },
    },
  );

  if (realTimeData?.timeSlotId.length === 0) {
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <BasicCard title={title} sx={{ position: 'relative', height: '100%' }}>
          <Typography variant="h6" color="textSecondary">
            <NoDataFound
              icon={
                <FaRegCalendarTimes
                  size={60}
                  style={{
                    transform: 'translateX(7px)',
                    color: '#999',
                  }}
                />
              }
              label="當前沒有門診"
            />
          </Typography>
        </BasicCard>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <BasicCard title={title} sx={{ height: '100%' }}>
        {typeof realTimeData.timePeriod === 'string' && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
          >
            <Typography variant="subtitle1" color="textSecondary">
              當前門診時段：
            </Typography>
            <ConsultationTimePeriodTag type={realTimeData.timePeriod} />
          </Box>
        )}
        {!realTimeData ? (
          <DataLoading />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="等待看診人數"
                  value={realTimeData?.waitForConsultationCount || 0}
                  duration={0.6}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="等待排治療床人數"
                  value={realTimeData?.waitForBedAssignedCount || 0}
                  duration={0.5}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="等待針灸治療人數"
                  value={realTimeData?.waitForAcupunctureTreatmentCount || 0}
                  duration={0.5}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="等待取針人數"
                  value={realTimeData?.waitForNeedleRemovedCount || 0}
                  duration={0.6}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="等待拿藥人數"
                  value={realTimeData?.waitForMedicineCount || 0}
                  duration={0.6}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="完成人數"
                  value={realTimeData?.completedCount || 0}
                  duration={0.6}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StatBox
                  title="退掛人數"
                  value={realTimeData?.onsiteCancelCount || 0}
                  duration={0.6}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </BasicCard>
    </Box>
  );
};

export default RealConsultationStatistic;
