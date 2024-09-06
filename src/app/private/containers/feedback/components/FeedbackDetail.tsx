import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import BasicCard from '../../../../../components/card/BasicCard';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { getSingleFeedback } from '../../../../../services/FeedbackService';
import TreatmentTag from '../../../../../components/tag/TreatmentTag';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import FeedbackSelectedContentTag from '../../../../../components/tag/FeedbackSelectedContentTag';
import OnsiteCancelTag from '../../../../../components/tag/OnsiteCancelTag';
import GenderTag from '../../../../../components/tag/GenderTag';

const FeedbackDetail: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR('getSingleFeedback', () =>
    getSingleFeedback({
      feedbackId: id as string,
    }),
  );

  if (isLoading) {
    return (
      <BasicCard title="反饋詳情">
        <Typography>Loading...</Typography>
      </BasicCard>
    );
  }

  if (!data) {
    return (
      <BasicCard title="反饋詳情">
        <Typography>No data available.</Typography>
      </BasicCard>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <BasicCard title="反饋詳情">
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
              反饋日期: {data.receivedDate}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">反饋星等:</Typography>
              <Rating value={data.feedbackRating} precision={0.5} readOnly />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">反饋選項:</Typography>
              <FeedbackSelectedContentTag type={data.selectedContent} />
            </Box>
            <Typography variant="body1">
              看診日期: {data.consultation.consultationDate}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">看診時段:</Typography>
              <ConsultationTimePeriodTag
                type={data.consultation.consultationTimePeriod}
              />
            </Box>
            {data.consultation.onsiteCancelAt && (
              <Typography variant="body1" sx={{ color: 'red' }}>
                退掛
              </Typography>
            )}
            {data.consultation.onsiteCancelReason && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1">退掛原因:</Typography>
                <OnsiteCancelTag type={data.consultation.onsiteCancelReason} />
              </Box>
            )}
            {data.consultation.treatmentType !== 'NO_TREATMENT' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1">當次治療:</Typography>
                <TreatmentTag type={data.consultation.treatmentType} />
              </Box>
            )}
          </Box>
        </BasicCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              反饋內容
            </Typography>
            <Typography variant="body1">
              {data.detailedContent && data.detailedContent !== 'null'
                ? data.detailedContent
                : '患者未寫反饋內容'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FeedbackDetail;
