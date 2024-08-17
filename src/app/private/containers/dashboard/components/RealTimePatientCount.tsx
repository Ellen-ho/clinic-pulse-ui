import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../context/AuthContext';
import useSWR from 'swr';
import {
  getConsultationRealTimeCount,
  IGetConsultationRealTimeCountRequest,
} from '../../../../../services/ConsultationService';
import BasicCard from '../../../../../components/card/BasicCard';
import { Box, Typography } from '@mui/material';
import CountUp from 'react-countup';
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
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const { data } = useSWR(
    shouldFetchData ? 'getConsultationRealTimeCount' : null,
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
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldFetchData(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [clinicId, consultationRoomNumber]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  if (data.timeSlotId.length === 0) {
    return (
      <BasicCard title={title}>
        <Typography variant="h6" color="textSecondary">
          當前沒有門診
        </Typography>
      </BasicCard>
    );
  }

  return (
    <BasicCard title={title}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Box>
          <Typography
            variant="subtitle1"
            color={'text.secondary'}
            lineHeight={'1rem'}
          >
            等待看診人數
          </Typography>
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp
              start={0}
              end={data.waitForConsultationCount}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp
              start={0}
              end={data.waitForBedAssignedCount}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp
              start={0}
              end={data.waitForAcupunctureTreatmentCount}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp
              start={0}
              end={data.waitForNeedleRemovedCount}
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp start={0} end={data.waitForMedicineCount} duration={0.6} />
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
          <Typography variant="h3" color={'text.primary'} lineHeight={'3rem'}>
            <CountUp start={0} end={data.completedCount} duration={0.6} />
          </Typography>
        </Box>
      </Box>
    </BasicCard>
  );
};

export default RealConsultationStatistic;
