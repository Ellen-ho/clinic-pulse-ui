import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';
import { IConsultationDetail } from '../../../../../types/Consultation';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getSingleConsultation } from '../../../../../services/ConsultationService';

const ConsultationDetail: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR('getSingleConsultation', () =>
    getSingleConsultation({
      consultationId: id as string,
    }),
  );

  if (isLoading) {
    return (
      <BasicCard title="Consultation Details">
        <Typography>Loading...</Typography>
      </BasicCard>
    );
  }

  if (!data) {
    return (
      <BasicCard title="Consultation Details">
        <Typography>No data available.</Typography>
      </BasicCard>
    );
  }

  return (
    <BasicCard title="門診詳情">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="body1">
          看診日期: {data.consultationDate}
        </Typography>
        <Typography variant="body1">
          看診時段: {data.consultationTimePeriod}
        </Typography>
        <Typography variant="body1">
          看診號碼: {data.consultationNumber}
        </Typography>
        {data.onsiteCancelAt && (
          <Typography variant="body1" sx={{ color: 'red' }}>
            退掛
          </Typography>
        )}
        {data.onsiteCancelReason && (
          <Typography variant="body1">
            退掛原因: {data.onsiteCancelReason}
          </Typography>
        )}
        {data.treatmentType !== 'NO_TREATMENT' && (
          <Typography variant="body1">
            當次治療: {data.treatmentType}
          </Typography>
        )}
        <Divider />
        <Typography
          variant="body1"
          sx={{
            color: data.patient.gender === 'FEMALE' ? 'pink' : 'lightblue',
          }}
        >
          患者:{' '}
          {`${data.patient.firstName} ${data.patient.lastName} (${data.patient.age}歲)`}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: data.doctor.gender === 'FEMALE' ? 'pink' : 'lightblue' }}
        >
          醫師: {`${data.doctor.firstName} ${data.doctor.lastName}`}
        </Typography>
      </Box>
    </BasicCard>
  );
};

export default ConsultationDetail;
