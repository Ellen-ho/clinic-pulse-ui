import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import homeBgUrl from '../../../../../../src/assets/home.png';
import AnimatedTypography from '../components/AnimatedText';
import FeatureCard from '../components/FeatureCard';

const HomeLanding: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '60vh',
          backgroundImage: `url(${homeBgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            color: '#fff',
            p: 2,
          }}
        >
          <AnimatedTypography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Clinic Pulse 診所管理系統
          </AnimatedTypography>
          <AnimatedTypography variant="body1" sx={{ mb: 3 }}>
            即時掌握診所動態，整合門診、反饋和數據統計，全方位提升診所管理效率
          </AnimatedTypography>
          <Button variant="contained" color="primary">
            登入
          </Button>
        </Box>
      </Box>
      <FeatureCard />
    </>
  );
};

export default HomeLanding;
