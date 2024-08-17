import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BasicCard from '../../../../../components/card/BasicCard';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getSingleConsultation } from '../../../../../services/ConsultationService';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import TreatmentTag from '../../../../../components/tag/TreatmentTag';
import OnsiteCancelTag from '../../../../../components/tag/OnsiteCancelTag';
import GenderTag from '../../../../../components/tag/GenderTag';

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">
            患者: {`${data.patient.lastName}${data.patient.firstName}`}
          </Typography>
          <GenderTag type={data.patient.gender} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1">
            醫師: {`${data.doctor.lastName}${data.doctor.firstName}`}
          </Typography>
          <GenderTag type={data.doctor.gender} />
        </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">退掛原因:</Typography>
            <OnsiteCancelTag type={data.onsiteCancelReason} />
          </Box>
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
