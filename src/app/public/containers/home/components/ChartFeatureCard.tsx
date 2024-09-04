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
        <Typography variant="h6" color="primary" gutterBottom></Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Title
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          subtitle
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChartFeatureCard;
