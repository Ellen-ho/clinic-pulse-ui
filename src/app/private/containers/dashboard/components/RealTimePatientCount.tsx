import { useContext, useMemo } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import {
  getConsultationRealTimeCount,
  IGetConsultationRealTimeCountRequest,
} from '../../../../../services/ConsultationService';
import BasicCard from '../../../../../components/card/BasicCard';
import { Box, Typography } from '@mui/material';
import CountUp from 'react-countup';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { FaRegCalendarTimes } from 'react-icons/fa';
import DataLoading from '../../../../../components/signs/DataLoading';
import { UserRoleType } from '../../../../../types/Users';

interface IRealConsultationStatisticProps {
  clinicId?: string;
  consultationRoomNumber?: string;
}

const RealConsultationStatistic: React.FC<IRealConsultationStatisticProps> = ({
  clinicId,
  consultationRoomNumber,
}) => {
  const title = '即時資料';
  const { state } = useContext(AuthContext);
  const currentUser = state.currentUser;

  const shouldFetch =
    currentUser?.role === UserRoleType.DOCTOR ||
    (currentUser?.role === UserRoleType.ADMIN && clinicId !== undefined);

  const { data, isLoading } = useSWR(
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
    { refreshInterval: 5000 },
  );

  if (data?.timeSlotId.length === 0) {
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
        {!data ? (
          <DataLoading />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                等待看診人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.waitForConsultationCount || 0}
                  duration={0.6}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                等待排治療床人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.waitForBedAssignedCount || 0}
                  duration={0.5}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                等待針灸治療人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.waitForAcupunctureTreatmentCount || 0}
                  duration={0.5}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                等待拔針人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.waitForNeedleRemovedCount || 0}
                  duration={0.6}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                等待拿藥人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.waitForMedicineCount || 0}
                  duration={0.6}
                />
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                lineHeight={'1rem'}
              >
                完成人數
              </Typography>
              <Typography
                variant="h3"
                color={'text.primary'}
                lineHeight={'3rem'}
              >
                <CountUp
                  start={0}
                  end={data?.completedCount || 0}
                  duration={0.6}
                />
              </Typography>
            </Box>
          </Box>
        )}
      </BasicCard>
    </Box>
  );
};

export default RealConsultationStatistic;
