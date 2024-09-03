import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IFirstTimeConsultationDescriptionProps {
  title: string;
  color: string;
  firstTimeConsultationCount: number;
  firstTimeConsultationRate: number;
  compareFirstTimeConsultation: number;
  compareFirstTimeRates: number;
  granularity: Granularity;
}

const FirstTimeConsultationDescription: React.FC<
  IFirstTimeConsultationDescriptionProps
> = ({
  title,
  color,
  firstTimeConsultationCount,
  firstTimeConsultationRate,
  compareFirstTimeConsultation,
  compareFirstTimeRates,
  granularity,
}) => {
  const getFirstTimeConsultationLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度初診人數: ${firstTimeConsultationCount} 人`;
      case Granularity.WEEK:
        return `當月度初診人數: ${firstTimeConsultationCount} 人`;
      case Granularity.DAY:
      default:
        return `當週初診人數: ${firstTimeConsultationCount} 人`;
    }
  };

  const getFirstTimeConsultationRateLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度初診率: ${firstTimeConsultationRate}%`;
      case Granularity.WEEK:
        return `當月度初診率: ${firstTimeConsultationRate}%`;
      case Granularity.DAY:
      default:
        return `當週初診率: ${firstTimeConsultationRate}%`;
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
        {/* First Time Consultation Count Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getFirstTimeConsultationLabel()}
              </Typography>
              {getComparisonLabel(compareFirstTimeConsultation, granularity)}
            </CardContent>
          </Card>
        </Grid>

        {/* First Time Consultation Rate Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getFirstTimeConsultationRateLabel()}
              </Typography>
              {getComparisonLabel(compareFirstTimeRates, granularity)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstTimeConsultationDescription;
