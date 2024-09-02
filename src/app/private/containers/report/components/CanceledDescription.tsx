import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface ICanceledDescriptionProps {
  title: string;
  color: string;
  consultationWithOnsiteCancel: number;
  onsiteCancelRate: number;
  compareConsultationWithOnsiteCancel: number;
  compareOsiteCancelRates: number;
  granularity: Granularity;
}

const CanceledDescription: React.FC<ICanceledDescriptionProps> = ({
  title,
  color,
  consultationWithOnsiteCancel,
  onsiteCancelRate,
  compareConsultationWithOnsiteCancel,
  compareOsiteCancelRates,
  granularity,
}) => {
  const getCanceledLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度退掛號人數: ${consultationWithOnsiteCancel} 人`;
      case Granularity.WEEK:
        return `當月度退掛號人數: ${consultationWithOnsiteCancel} 人`;
      case Granularity.DAY:
      default:
        return `當週退掛號人數: ${consultationWithOnsiteCancel} 人`;
    }
  };

  const getCanceledRateLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度退掛號率: ${onsiteCancelRate}%`;
      case Granularity.WEEK:
        return `當月度退掛號率: ${onsiteCancelRate}%`;
      case Granularity.DAY:
      default:
        return `當週退掛號率: ${onsiteCancelRate}%`;
    }
  };

  const getComparisonLabel = (rate: number, granularity: Granularity) => {
    if (rate === 0) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    const color = isPositive ? 'green' : 'red';
    const icon = isPositive ? (
      <TrendingUpIcon style={{ color }} />
    ) : (
      <TrendingDownIcon style={{ color }} />
    );

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
          {Math.round(Math.abs(rate))}%
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
        {/* Consultation with Onsite Cancel Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">{getCanceledLabel()}</Typography>
              {getComparisonLabel(
                compareConsultationWithOnsiteCancel,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Onsite Cancel Rate Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">{getCanceledRateLabel()}</Typography>
              {getComparisonLabel(compareOsiteCancelRates, granularity)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CanceledDescription;
