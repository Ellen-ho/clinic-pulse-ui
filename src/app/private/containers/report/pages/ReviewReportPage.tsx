import dayjs from 'dayjs';
import { Granularity } from '../../../../../types/Share';
import { useEffect, useState } from 'react';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { Box, Card, Grid } from '@mui/material';

import {
  getReviewCountAndRate,
  IGetReviewCountAndRateResponse,
} from '../../../../../services/ReviewService';
import ReviewDescription from '../components/ReviewDescription';
import ReviewChart from '../components/ReviewChart';
import ReviewFilters from '../components/ReviewFilters';

interface IFilters {
  startDate: string;
  endDate: string;
  clinicId?: string;
  granularity: Granularity;
}

const ReviewReportPage: React.FC = () => {
  const cardStyle = { padding: '20px' };
  const chartStyle = { height: '300px' };

  const [filters, setFilters] = useState<IFilters>({
    startDate: dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    clinicId: '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
    granularity: Granularity.DAY,
  });

  const [reviewData, setReviewData] =
    useState<IGetReviewCountAndRateResponse | null>(null);

  const buildQueryString = (filters: IFilters) => {
    const params = new URLSearchParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      granularity: filters.granularity,
    });

    if (filters.clinicId) params.set('clinicId', filters.clinicId);

    return params.toString();
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getReviewCountAndRate({ queryString });
      setReviewData(responseData);
    };

    fetchReviewData();
  }, [filters]);

  const handleApplyFilters = (newFilters: {
    startDate: string;
    endDate: string;
    granularity: Granularity;
  }) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Grid container spacing={1} sx={{ paddingBottom: '20px' }}>
          <Grid item xs={12} md={12} lg={12}>
            <ReviewFilters onApply={handleApplyFilters} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {reviewData && (
                <>
                  <ReviewDescription
                    title="評論星級和比率"
                    color="#f3faff"
                    totalReviews={reviewData.totalReviews}
                    oneStarReviewCount={reviewData.oneStarReviewCount}
                    twoStarReviewCount={reviewData.twoStarReviewCount}
                    threeStarReviewCount={reviewData.threeStarReviewCount}
                    fourStarReviewCount={reviewData.fourStarReviewCount}
                    fiveStarReviewCount={reviewData.fiveStarReviewCount}
                    compareTotalReviews={reviewData.compareTotalReviews}
                    compareOneStarReviewCount={
                      reviewData.compareOneStarReviewCount
                    }
                    compareTwoStarReviewCount={
                      reviewData.compareTwoStarReviewCount
                    }
                    compareThreeStarReviewCount={
                      reviewData.compareThreeStarReviewCount
                    }
                    compareFourStarReviewCount={
                      reviewData.compareFourStarReviewCount
                    }
                    compareFiveStarReviewCount={
                      reviewData.compareFiveStarReviewCount
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <ReviewChart
                      data={reviewData.data}
                      granularity={filters.granularity}
                    />
                  </Box>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ReviewReportPage;
