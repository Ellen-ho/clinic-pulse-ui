import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Granularity } from '../../../../../types/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface IWaitingTimeDescriptionProps {
  title: string;
  color: string;
  totalAverageConsultationWait: number;
  totalAverageBedAssignmentWait: number;
  totalAverageAcupunctureWait: number;
  totalAverageNeedleRemovalWait: number;
  totalAverageMedicationWait: number;
  compareAverageConsultationWaitRate: number;
  compareAverageBedAssignmentWaitRate: number;
  compareAverageAcupunctureWaitRate: number;
  compareAverageNeedleRemovalWaitRate: number;
  compareAverageMedicationWaitRate: number;
  granularity: Granularity;
}

const WaitingTimeDescription: React.FC<IWaitingTimeDescriptionProps> = ({
  title,
  color,
  totalAverageConsultationWait,
  totalAverageBedAssignmentWait,
  totalAverageAcupunctureWait,
  totalAverageNeedleRemovalWait,
  totalAverageMedicationWait,
  compareAverageConsultationWaitRate,
  compareAverageBedAssignmentWaitRate,
  compareAverageAcupunctureWaitRate,
  compareAverageNeedleRemovalWaitRate,
  compareAverageMedicationWaitRate,
  granularity,
}) => {
  const getAverageConsultationWaitLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度等待看診平均時間: ${totalAverageConsultationWait} 分`;
      case Granularity.WEEK:
        return `當月度等待看診平均時間: ${totalAverageConsultationWait} 分`;
      case Granularity.DAY:
      default:
        return `當週等待看診平均時間: ${totalAverageConsultationWait} 分`;
    }
  };

  const getAverageBedAssignmentWaitLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度等待排床平均時間: ${totalAverageBedAssignmentWait} 分`;
      case Granularity.WEEK:
        return `當月度等待排床平均時間: ${totalAverageBedAssignmentWait} 分`;
      case Granularity.DAY:
      default:
        return `當週等待排床平均時間: ${totalAverageBedAssignmentWait} 分`;
    }
  };

  const getAverageAcupunctureWaitLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度等待針灸平均時間: ${totalAverageAcupunctureWait} 分`;
      case Granularity.WEEK:
        return `當月度等待針灸平均時間: ${totalAverageAcupunctureWait} 分`;
      case Granularity.DAY:
      default:
        return `當週等待針灸平均時間: ${totalAverageAcupunctureWait} 分`;
    }
  };

  const getAverageNeedleRemovalWaitLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度等待取針平均時間: ${totalAverageNeedleRemovalWait} 分`;
      case Granularity.WEEK:
        return `當月度等待取針平均時間: ${totalAverageNeedleRemovalWait} 分`;
      case Granularity.DAY:
      default:
        return `當週等待取針平均時間: ${totalAverageNeedleRemovalWait} 分`;
    }
  };

  const getAverageMedicationWaitLabel = () => {
    switch (granularity) {
      case Granularity.MONTH:
        return `當年度等待拿藥平均時間: ${totalAverageMedicationWait} 分`;
      case Granularity.WEEK:
        return `當月度等待拿藥平均時間: ${totalAverageMedicationWait} 分`;
      case Granularity.DAY:
      default:
        return `當週等待拿藥平均時間: ${totalAverageMedicationWait} 分`;
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
          <Typography variant="body2" sx={{ mx: 0.5 }}>
            vs
          </Typography>
          <Typography variant="body2">
            {granularity === Granularity.DAY
              ? '上週'
              : granularity === Granularity.WEEK
              ? '上個月'
              : '去年'}
          </Typography>
        </Box>
      );
    }

    const isCutDown = rate < 0;
    const color = isCutDown ? 'green' : 'red';
    const icon = isCutDown ? (
      <TrendingDownIcon style={{ color }} />
    ) : (
      <TrendingUpIcon style={{ color }} />
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
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAverageConsultationWaitLabel()}
              </Typography>
              {getComparisonLabel(
                compareAverageConsultationWaitRate,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAverageBedAssignmentWaitLabel()}
              </Typography>
              {getComparisonLabel(
                compareAverageBedAssignmentWaitRate,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAverageAcupunctureWaitLabel()}
              </Typography>
              {getComparisonLabel(
                compareAverageAcupunctureWaitRate,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAverageNeedleRemovalWaitLabel()}
              </Typography>
              {getComparisonLabel(
                compareAverageNeedleRemovalWaitRate,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2">
                {getAverageMedicationWaitLabel()}
              </Typography>
              {getComparisonLabel(
                compareAverageMedicationWaitRate,
                granularity,
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaitingTimeDescription;
