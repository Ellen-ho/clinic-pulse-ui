import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import iconBgUrl from '../../../../../../src/assets/chart_icon.png';

const StyledImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '8px',
}));

const ChartFeatureCard: React.FC = () => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      sx={{ width: '80%', margin: '0 auto' }}
    >
      <Grid item xs={12} md={4}>
        {' '}
        <StyledImage
          component="img"
          src={iconBgUrl}
          alt="Adventure"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '8px',
          }}
          {...({} as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        {' '}
        <Typography variant="h6" color="primary" gutterBottom>
          統計中心
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          多維度數據分析，助力診所經營決策
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          根據不同的時間顆粒度彙整和比較數據，隨時掌握經營狀況，支持診所的數據驅動決策
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChartFeatureCard;
