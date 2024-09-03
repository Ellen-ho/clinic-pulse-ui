import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IFeedbackDescriptionProps {
  title: string;
  color: string;
  totalFeedbacks: number;
  oneStarFeedbackCount: number;
  twoStarFeedbackCount: number;
  threeStarFeedbackCount: number;
  fourStarFeedbackCount: number;
  fiveStarFeedbackCount: number;
  compareTotalFeedbacks: number;
  compareOneStarFeedbackCount: number;
  compareTwoStarFeedbackCount: number;
  compareThreeStarFeedbackCount: number;
  compareFourStarFeedbackCount: number;
  compareFiveStarFeedbackCount: number;
  granularity: Granularity;
}

const FeedbackDescription: React.FC<IFeedbackDescriptionProps> = ({
  title,
  color,
  totalFeedbacks,
  oneStarFeedbackCount,
  twoStarFeedbackCount,
  threeStarFeedbackCount,
  fourStarFeedbackCount,
  fiveStarFeedbackCount,
  compareTotalFeedbacks,
  compareOneStarFeedbackCount,
  compareTwoStarFeedbackCount,
  compareThreeStarFeedbackCount,
  compareFourStarFeedbackCount,
  compareFiveStarFeedbackCount,
  granularity,
}) => {
  const getTotalFeedbacksLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度反饋數量: ${totalFeedbacks} 則`;
      case Granularity.WEEK:
        return `當月度反饋數量: ${totalFeedbacks} 則`;
      case Granularity.DAY:
      default:
        return `當週反饋數量: ${totalFeedbacks} 則`;
    }
  };

  const getOneStarFeedbackCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度一星反饋數: ${oneStarFeedbackCount} 則`;
      case Granularity.WEEK:
        return `當月度一星反饋數: ${oneStarFeedbackCount} 則`;
      case Granularity.DAY:
      default:
        return `當週一星反饋數: ${oneStarFeedbackCount} 則`;
    }
  };

  const getTwoStarFeedbackCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度二星反饋數: ${twoStarFeedbackCount} 則`;
      case Granularity.WEEK:
        return `當月度二星反饋數: ${twoStarFeedbackCount} 則`;
      case Granularity.DAY:
      default:
        return `當週二星反饋數: ${twoStarFeedbackCount} 則`;
    }
  };

  const getThreeStarFeedbackCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度三星反饋數: ${threeStarFeedbackCount} 則`;
      case Granularity.WEEK:
        return `當月度三星反饋數: ${threeStarFeedbackCount} 則`;
      case Granularity.DAY:
      default:
        return `當週三星反饋數: ${threeStarFeedbackCount} 則`;
    }
  };

  const getFourStarFeedbackCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度四星反饋數: ${fourStarFeedbackCount} 則`;
      case Granularity.WEEK:
        return `當月度四星反饋數: ${fourStarFeedbackCount} 則`;
      case Granularity.DAY:
      default:
        return `當週四星反饋數: ${fourStarFeedbackCount} 則`;
    }
  };

  const getFiveStarFeedbackCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度五星反饋數: ${fiveStarFeedbackCount} 則`;
      case Granularity.WEEK:
        return `當月度五星反饋數: ${fiveStarFeedbackCount} 則`;
      case Granularity.DAY:
      default:
        return `當週五星反饋數: ${fiveStarFeedbackCount} 則`;
    }
  };

  const getComparisonLabel = (
    rate: number,
    granularity: Granularity,
    isFiveStar: boolean,
  ) => {
    if (rate === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'gray' }}>
            相等
          </Typography>
          <Typography variant="body2">
            {' '}
            vs{' '}
            {granularity === Granularity.DAY
              ? '上週'
              : granularity === Granularity.WEEK
              ? '上個月'
              : '去年'}
          </Typography>
        </Box>
      );
    }

    const isPositive = rate > 0;
    let color = 'green';
    let icon;

    if (isFiveStar) {
      color = isPositive ? 'green' : 'red';
      icon = isPositive ? (
        <TrendingUpIcon style={{ color }} />
      ) : (
        <TrendingDownIcon style={{ color }} />
      );
    } else {
      color = isPositive ? 'red' : 'green';
      icon = isPositive ? (
        <TrendingUpIcon style={{ color }} />
      ) : (
        <TrendingDownIcon style={{ color }} />
      );
    }

    const comparisonText =
      granularity === Granularity.DAY
        ? 'vs 上週'
        : granularity === Granularity.WEEK
        ? 'vs 上個月'
        : 'vs 去年';

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Typography variant="body2" sx={{ color }}>
          {Math.abs(rate)}%
        </Typography>
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {comparisonText}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: color,
        borderRadius: '8px',
        padding: '8px 16px',
        marginBottom: '8px',
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', marginBottom: '16px' }}
      >
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalFeedbacksLabel()}
              </Typography>
              {getComparisonLabel(compareTotalFeedbacks, granularity, false)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getOneStarFeedbackCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareOneStarFeedbackCount,
                granularity,
                false,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTwoStarFeedbackCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareTwoStarFeedbackCount,
                granularity,
                false,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getThreeStarFeedbackCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareThreeStarFeedbackCount,
                granularity,
                false,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getFourStarFeedbackCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareFourStarFeedbackCount,
                granularity,
                false,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getFiveStarFeedbackCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareFiveStarFeedbackCount,
                granularity,
                true,
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedbackDescription;
