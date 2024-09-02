import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IConsultationDescriptionProps {
  title: string;
  color: string;
  totalConsultations: number;
  totalSlots: number;
  averagePatientPerSlot: number;
  compareTotalRate: number;
  compareAverageRate: number;
  compareSlotRate: number;
  granularity: Granularity;
}

const ConsultationDescription: React.FC<IConsultationDescriptionProps> = ({
  title,
  color,
  totalConsultations,
  totalSlots,
  averagePatientPerSlot,
  compareTotalRate,
  compareAverageRate,
  compareSlotRate,
  granularity,
}) => {
  const getTotalConsultationsLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度總人數: ${totalConsultations} 人`;
      case Granularity.WEEK:
        return `當月度總人數: ${totalConsultations} 人`;
      case Granularity.DAY:
      default:
        return `當週總人數: ${totalConsultations} 人`;
    }
  };

  const getTotalSlotsLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度總門診數: ${totalSlots} 診`;
      case Granularity.WEEK:
        return `當月度總門診數: ${totalSlots} 診`;
      case Granularity.DAY:
      default:
        return `當週總門診數: ${totalSlots} 診`;
    }
  };

  const getAveragePatientPerSlotLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度平均每診人數: ${averagePatientPerSlot} 人`;
      case Granularity.WEEK:
        return `當月度平均每診人數: ${averagePatientPerSlot} 人`;
      case Granularity.DAY:
      default:
        return `當週平均每診人數: ${averagePatientPerSlot} 人`;
    }
  };

  const getComparisonLabel = (rate: number, granularity: Granularity) => {
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
        <Typography variant="body2" sx={{ color }}>
          {Math.round(Math.abs(rate))}%
        </Typography>
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {' '}
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
        variant="subtitle1"
        sx={{ fontWeight: 'bold', marginBottom: '16px' }}
      >
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalConsultationsLabel()}
              </Typography>
              {getComparisonLabel(compareTotalRate, granularity)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">{getTotalSlotsLabel()}</Typography>
              {getComparisonLabel(compareSlotRate, granularity)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAveragePatientPerSlotLabel()}
              </Typography>
              {getComparisonLabel(compareAverageRate, granularity)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultationDescription;
