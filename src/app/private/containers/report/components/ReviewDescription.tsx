import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IReviewDescriptionProps {
  title: string;
  color: string;
  totalReviews: number;
  oneStarReviewCount: number;
  twoStarReviewCount: number;
  threeStarReviewCount: number;
  fourStarReviewCount: number;
  fiveStarReviewCount: number;
  compareTotalReviews: number;
  compareOneStarReviewCount: number;
  compareTwoStarReviewCount: number;
  compareThreeStarReviewCount: number;
  compareFourStarReviewCount: number;
  compareFiveStarReviewCount: number;
  granularity: Granularity;
}

const ReviewDescription: React.FC<IReviewDescriptionProps> = ({
  title,
  color,
  totalReviews,
  oneStarReviewCount,
  twoStarReviewCount,
  threeStarReviewCount,
  fourStarReviewCount,
  fiveStarReviewCount,
  compareTotalReviews,
  compareOneStarReviewCount,
  compareTwoStarReviewCount,
  compareThreeStarReviewCount,
  compareFourStarReviewCount,
  compareFiveStarReviewCount,
  granularity,
}) => {
  const getTotalReviewsLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度評論數: ${totalReviews} 則`;
      case Granularity.WEEK:
        return `當月度評論數: ${totalReviews} 則`;
      case Granularity.DAY:
      default:
        return `當週評論數: ${totalReviews} 則`;
    }
  };

  const getOneStarReviewCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度一星評論數: ${oneStarReviewCount} 則`;
      case Granularity.WEEK:
        return `當月度一星評論數: ${oneStarReviewCount} 則`;
      case Granularity.DAY:
      default:
        return `當週一星評論數: ${oneStarReviewCount} 則`;
    }
  };

  const getTwoStarReviewCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度二星評論數: ${twoStarReviewCount} 則`;
      case Granularity.WEEK:
        return `當月度二星評論數: ${twoStarReviewCount} 則`;
      case Granularity.DAY:
      default:
        return `當週二星評論數: ${twoStarReviewCount} 則`;
    }
  };

  const getThreeStarReviewCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度三星評論數: ${threeStarReviewCount} 則`;
      case Granularity.WEEK:
        return `當月度三星評論數: ${threeStarReviewCount} 則`;
      case Granularity.DAY:
      default:
        return `當週三星評論數: ${threeStarReviewCount} 則`;
    }
  };

  const getFourStarReviewCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度四星評論數: ${fourStarReviewCount} 則`;
      case Granularity.WEEK:
        return `當月度四星評論數: ${fourStarReviewCount} 則`;
      case Granularity.DAY:
      default:
        return `當週四星評論數: ${fourStarReviewCount} 則`;
    }
  };

  const getFiveStarReviewCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度五星評論數: ${fiveStarReviewCount} 則`;
      case Granularity.WEEK:
        return `當月度五星評論數: ${fiveStarReviewCount} 則`;
      case Granularity.DAY:
      default:
        return `當週五星評論數: ${fiveStarReviewCount} 則`;
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
              <Typography variant="body2">{getTotalReviewsLabel()}</Typography>
              {getComparisonLabel(compareTotalReviews, granularity, false)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getOneStarReviewCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareOneStarReviewCount,
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
                {getTwoStarReviewCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareTwoStarReviewCount,
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
                {getThreeStarReviewCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareThreeStarReviewCount,
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
                {getFourStarReviewCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareFourStarReviewCount,
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
                {getFiveStarReviewCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareFiveStarReviewCount,
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

export default ReviewDescription;
