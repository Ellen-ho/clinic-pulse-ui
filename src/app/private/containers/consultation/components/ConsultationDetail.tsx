import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getSingleConsultation } from '../../../../../services/ConsultationService';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import TreatmentTag from '../../../../../components/tag/TreatmentTag';

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
    <BasicCard title="看診詳情">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography
          variant="body1"
          sx={{
            color: data.patient.gender === 'FEMALE' ? '#e42269' : '#5886b0',
            fontWeight: 'bold',
          }}
        >
          患者:{' '}
          {`${data.patient.lastName}${data.patient.firstName} (${data.patient.age}歲)`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: data.doctor.gender === 'FEMALE' ? '#e42269' : '#5886b0',
            fontWeight: 'bold',
          }}
        >
          醫師: {`${data.doctor.lastName}${data.doctor.firstName}`}
        </Typography>
        <Divider />
        <Typography variant="body1">
          看診日期: {data.consultationDate}
        </Typography>
        <Typography variant="body1">
          看診時段:{' '}
          <ConsultationTimePeriodTag type={data.consultationTimePeriod} />
          {}
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
            當次治療: <TreatmentTag type={data.treatmentType} />
          </Typography>
        )}
      </Box>
    </BasicCard>
  );
};

export default ConsultationDetail;
