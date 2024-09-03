import dayjs from 'dayjs';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import { useContext, useEffect, useState } from 'react';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { Box, Card, Grid } from '@mui/material';
import TimeFilters from '../components/TimeFilters';
import { AuthContext } from '../../../../../context/AuthContext';
import {
  getFeedbackCountAndRate,
  IGetFeedbackCountAndRateResponse,
} from '../../../../../services/FeedbackService';
import FeedbackDescription from '../components/FeedbackDescription';
import FeedbackChart from '../components/FeedbackChart';

interface IFilters {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity: Granularity;
}

const FeedbackReportPage: React.FC = () => {
  const cardStyle = { padding: '20px' };
  const chartStyle = { height: '300px' };

  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId || '';
  const isDoctor = state.doctorId != null;

  const [filters, setFilters] = useState<IFilters>({
    startDate: dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    clinicId: undefined,
    doctorId: isDoctor ? doctorId : undefined,
    timePeriod: undefined,
    granularity: Granularity.DAY,
  });

  const [feedbackData, setFeedbackData] =
    useState<IGetFeedbackCountAndRateResponse | null>(null);

  const buildQueryString = (filters: IFilters) => {
    const params = new URLSearchParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      granularity: filters.granularity,
    });

    if (filters.clinicId) params.set('clinicId', filters.clinicId);
    if (filters.doctorId) params.set('doctorId', filters.doctorId);
    if (filters.timePeriod) params.set('timePeriod', filters.timePeriod);

    return params.toString();
  };

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const queryString = buildQueryString(filters);
      const responseData = await getFeedbackCountAndRate({ queryString });
      setFeedbackData(responseData);
    };

    fetchFeedbackData();
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <TimeFilters onApply={handleApplyFilters} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Card sx={cardStyle}>
              {feedbackData && (
                <>
                  <FeedbackDescription
                    title="反饋星級和反饋分類"
                    color="#f3faff"
                    totalFeedbacks={feedbackData.totalFeedbacks}
                    oneStarFeedbackCount={feedbackData.oneStarFeedbackCount}
                    twoStarFeedbackCount={feedbackData.twoStarFeedbackCount}
                    threeStarFeedbackCount={feedbackData.threeStarFeedbackCount}
                    fourStarFeedbackCount={feedbackData.fourStarFeedbackCount}
                    fiveStarFeedbackCount={feedbackData.fiveStarFeedbackCount}
                    compareTotalFeedbacks={feedbackData.compareTotalFeedbacks}
                    compareOneStarFeedbackCount={
                      feedbackData.compareOneStarFeedbackCount
                    }
                    compareTwoStarFeedbackCount={
                      feedbackData.compareTwoStarFeedbackCount
                    }
                    compareThreeStarFeedbackCount={
                      feedbackData.compareThreeStarFeedbackCount
                    }
                    compareFourStarFeedbackCount={
                      feedbackData.compareFourStarFeedbackCount
                    }
                    compareFiveStarFeedbackCount={
                      feedbackData.compareFiveStarFeedbackCount
                    }
                    granularity={filters.granularity}
                  />
                  <Box sx={chartStyle}>
                    <FeedbackChart
                      data={feedbackData.data}
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

export default FeedbackReportPage;
