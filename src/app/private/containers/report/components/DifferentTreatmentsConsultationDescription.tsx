import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IDifferentTreatmentsConsultationDescriptionProps {
  title: string;
  color: string;
  totalConsultationWithBothTreatment: number;
  totalOnlyAcupunctureCount: number;
  totalOnlyMedicineCount: number;
  totalOnlyAcupunctureRate: number;
  totalOnlyMedicineRate: number;
  totalBothTreatmentRate: number;
  compareTotalConsultationWithBothTreatment: number;
  compareTotalOnlyAcupunctureCount: number;
  compareTotalOnlyMedicineCount: number;
  compareTotalOnlyAcupunctureRate: number;
  compareTotalOnlyMedicineRate: number;
  compareTotalBothTreatmentRate: number;
  granularity: Granularity;
}

const DifferentTreatmentsConsultationDescription: React.FC<
  IDifferentTreatmentsConsultationDescriptionProps
> = ({
  title,
  color,
  totalConsultationWithBothTreatment,
  totalOnlyAcupunctureCount,
  totalOnlyMedicineCount,
  totalOnlyAcupunctureRate,
  totalOnlyMedicineRate,
  totalBothTreatmentRate,
  compareTotalConsultationWithBothTreatment,
  compareTotalOnlyAcupunctureCount,
  compareTotalOnlyMedicineCount,
  compareTotalOnlyAcupunctureRate,
  compareTotalOnlyMedicineRate,
  compareTotalBothTreatmentRate,
  granularity,
}) => {
  const getTotalOnlyAcupunctureCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度純針灸治療人數: ${totalOnlyAcupunctureCount} 人`;
      case Granularity.WEEK:
        return `當月度純針灸治療人數: ${totalOnlyAcupunctureCount} 人`;
      case Granularity.DAY:
      default:
        return `當週純針灸治療人數: ${totalOnlyAcupunctureCount} 人`;
    }
  };

  const getTotalOnlyMedicineCountLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度純藥物治療人數: ${totalOnlyMedicineCount} 人`;
      case Granularity.WEEK:
        return `當月度純藥物治療人數: ${totalOnlyMedicineCount} 人`;
      case Granularity.DAY:
      default:
        return `當週純藥物治療人數: ${totalOnlyMedicineCount} 人`;
    }
  };

  const getTotalConsultationWithBothTreatmentLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度針灸及藥物治療人數: ${totalConsultationWithBothTreatment} 人`;
      case Granularity.WEEK:
        return `當月度針灸及藥物治療人數: ${totalConsultationWithBothTreatment} 人`;
      case Granularity.DAY:
      default:
        return `當週針灸及藥物治療人數: ${totalConsultationWithBothTreatment} 人`;
    }
  };

  const getTotalOnlyAcupunctureRateLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度純針灸治療比率: ${totalOnlyAcupunctureRate}%`;
      case Granularity.WEEK:
        return `當月度純針灸治療比率: ${totalOnlyAcupunctureRate}%`;
      case Granularity.DAY:
      default:
        return `當週純針灸治療比率: ${totalOnlyAcupunctureRate}%`;
    }
  };

  const getTotalOnlyMedicineRateLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度純藥物治療比率: ${totalOnlyMedicineRate}%`;
      case Granularity.WEEK:
        return `當月度純藥物治療比率: ${totalOnlyMedicineRate}%`;
      case Granularity.DAY:
      default:
        return `當週純藥物治療比率: ${totalOnlyMedicineRate}%`;
    }
  };

  const getTotalBothTreatmentRateLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度針灸及藥物治療比率: ${totalBothTreatmentRate}%`;
      case Granularity.WEEK:
        return `當月度針灸及藥物治療比率: ${totalBothTreatmentRate}%`;
      case Granularity.DAY:
      default:
        return `當週針灸及藥物治療比率: ${totalBothTreatmentRate}%`;
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
        {/* Total Only Acupuncture Count Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalOnlyAcupunctureCountLabel()}
              </Typography>
              {getComparisonLabel(
                compareTotalOnlyAcupunctureCount,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Total Only Medicine Count Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalOnlyMedicineCountLabel()}
              </Typography>
              {getComparisonLabel(compareTotalOnlyMedicineCount, granularity)}
            </CardContent>
          </Card>
        </Grid>

        {/* Total Consultation With Both Treatments Count Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalConsultationWithBothTreatmentLabel()}
              </Typography>
              {getComparisonLabel(
                compareTotalConsultationWithBothTreatment,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Total Only Acupuncture Rate Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalOnlyAcupunctureRateLabel()}
              </Typography>
              {getComparisonLabel(compareTotalOnlyAcupunctureRate, granularity)}
            </CardContent>
          </Card>
        </Grid>

        {/* Total Only Medicine Rate Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalOnlyMedicineRateLabel()}
              </Typography>
              {getComparisonLabel(compareTotalOnlyMedicineRate, granularity)}
            </CardContent>
          </Card>
        </Grid>

        {/* Total Both Treatments Rate Card */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getTotalBothTreatmentRateLabel()}
              </Typography>
              {getComparisonLabel(compareTotalBothTreatmentRate, granularity)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DifferentTreatmentsConsultationDescription;
