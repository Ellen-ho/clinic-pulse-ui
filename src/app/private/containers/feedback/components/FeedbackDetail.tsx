import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import BasicCard from '../../../../../components/card/BasicCard';
import { Box, Divider, Typography } from '@mui/material';
import { getSingleFeedback } from '../../../../../services/FeedbackService';

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
    <BasicCard title="反饋詳情">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="body1">反饋日期: {data.receivedDate}</Typography>
        <Typography variant="body1">反饋星等: {data.feedbackRating}</Typography>
        <Typography variant="body1">
          反饋選項: {data.selectedContent}
        </Typography>
        <Typography variant="body1">
          反饋內容: {data.detailedContent}
        </Typography>
        <Typography variant="body1">
          看診日期: {data.consultation.consultationDate}
        </Typography>
        <Typography variant="body1">
          看診時段: {data.consultation.consultationTimePeriod}
        </Typography>
        {data.consultation.onsiteCancelAt && (
          <Typography variant="body1" sx={{ color: 'red' }}>
            退掛
          </Typography>
        )}
        {data.consultation.onsiteCancelReason && (
          <Typography variant="body1">
            退掛原因: {data.consultation.onsiteCancelReason}
          </Typography>
        )}
        {data.consultation.treatmentType !== 'NO_TREATMENT' && (
          <Typography variant="body1">
            當次治療: {data.consultation.treatmentType}
          </Typography>
        )}
        <Divider />
        <Typography
          variant="body1"
          sx={{
            color: data.patient.gender === 'FEMALE' ? 'pink' : 'lightblue',
          }}
        >
          患者: {`${data.patient.firstName} ${data.patient.lastName}`}
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

export default FeedbackDetail;
