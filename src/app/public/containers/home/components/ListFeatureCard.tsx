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
      sx={{ width: '70%', margin: '0 auto' }}
    >
      <Grid item xs={12} md={8}>
        {' '}
        <Typography variant="h6" color="primary" gutterBottom>
          紀錄列表
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          快速篩選與定位問題，提升診療效率
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          提供條件篩選功能，能夠根據需要查找具體的看診、反饋、評論紀錄，迅速找出問題並採取相應措施
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
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
