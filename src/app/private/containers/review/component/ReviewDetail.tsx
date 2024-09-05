import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import BasicCard from '../../../../../components/card/BasicCard';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { getSingleReview } from '../../../../../services/ReviewService';

const ReviewDetail: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR('getSingleReview', () =>
    getSingleReview({
      reviewId: id as string,
    }),
  );

  if (isLoading) {
    return (
      <BasicCard title="Google 評論詳情">
        <Typography>Loading...</Typography>
      </BasicCard>
    );
  }

  if (!data) {
    return (
      <BasicCard title="Google 評論詳情">
        <Typography>No data available.</Typography>
      </BasicCard>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <BasicCard title="Google 評論詳情">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">
                評論者: {data.reviewerName}
              </Typography>
            </Box>
            <Divider />
            <Typography variant="body1">
              評論日期: {data.receivedDate}
            </Typography>
            <Typography variant="body1">
              評論星等: {data.reviewRating}
            </Typography>
            <Typography variant="body1">
              回覆日期: {data.responseDate}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'blue',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'darkblue',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (
                  typeof data.link === 'string' &&
                  data.link.startsWith('https://')
                ) {
                  window.open(data.link, '_blank');
                } else {
                  console.warn('Invalid link:', data.link);
                }
              }}
            >
              查看評論連結
            </Typography>
          </Box>
        </BasicCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              評論內容
            </Typography>
            <Typography variant="body1">
              {data.snippet && data.snippet !== 'null'
                ? data.snippet
                : '患者未寫評論內容'}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              回覆內容
            </Typography>
            <Typography variant="body1">
              {data.responseSnippet && data.responseSnippet !== 'null'
                ? data.responseSnippet
                : '院方尚未回覆評論'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReviewDetail;
