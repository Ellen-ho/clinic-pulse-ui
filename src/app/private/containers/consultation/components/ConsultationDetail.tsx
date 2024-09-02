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
import RowItem from '../../../../../components/card/RowItem';

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
        <RowItem label={'患者'}>
          {`${data.patient.lastName}${data.patient.firstName}`}
        </RowItem>
        <RowItem label={'醫師'}>
          {`${data.doctor.lastName}${data.doctor.firstName}`}
        </RowItem>
        <RowItem label={'看診日期'}>{data.consultationDate}</RowItem>
        <RowItem label={'看診時段'}>
          <ConsultationTimePeriodTag type={data.consultationTimePeriod} />
        </RowItem>

        <RowItem label={'看診號碼'}>{data.consultationNumber}</RowItem>
        {data.onsiteCancelAt && (
          <Typography variant="body1" sx={{ color: 'red' }}>
            退掛
          </Typography>
        )}
        {data.onsiteCancelReason && (
          <RowItem label={'退掛原因'}>
            <OnsiteCancelTag type={data.onsiteCancelReason} />
          </RowItem>
        )}
        {data.treatmentType !== 'NO_TREATMENT' && (
          <RowItem label={'當次治療'}>
            <TreatmentTag type={data.treatmentType} />
          </RowItem>
        )}
      </Box>
    </BasicCard>
  );
};

export default ConsultationDetail;
