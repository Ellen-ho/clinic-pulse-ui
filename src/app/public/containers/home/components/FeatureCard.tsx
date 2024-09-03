import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import iconBgUrl from '../../../../../../src/assets/real_time.png';

const StyledImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '8px',
}));

const FeatureCard: React.FC = () => {
  return (
    <Grid container spacing={4} alignItems="center">
      {/* 左側單張圖片 */}
      <Grid item xs={12} md={6}>
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

      {/* 右側文本區域 */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" color="primary" gutterBottom>
          即時資料
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          WE ARE THE MOST FUN COMPANY ABOUT TRAVEL AND ADVENTURE
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FeatureCard;
