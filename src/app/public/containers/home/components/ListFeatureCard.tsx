import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import listIconBgUrl from '../../../../../../src/assets/list_icon.png';

const StyledImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '8px',
}));

const ListFeatureCard: React.FC = () => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      sx={{ width: '90%', margin: '0 auto' }}
    >
      {/* 左側文本區域 */}
      <Grid item xs={12} md={7}>
        {' '}
        <Typography variant="h6" color="primary" gutterBottom>
          紀錄列表
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Title
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          subtitle
        </Typography>
      </Grid>

      <Grid item xs={12} md={5}>
        {' '}
        <StyledImage
          component="img"
          src={listIconBgUrl}
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
    </Grid>
  );
};

export default ListFeatureCard;
