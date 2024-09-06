import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import homeBgUrl from '../../../../../../src/assets/home.png';
import AnimatedTypography from '../components/AnimatedText';
import FeatureCard from '../components/RealTimeFeatureCard';
import ListFeatureCard from '../components/ListFeatureCard';
import ChartFeatureCard from '../components/ChartFeatureCard';
import { useNavigate } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import RealTimeFeatureCard from '../components/RealTimeFeatureCard';
import AppFooter from '../../../../layout/AppFooter';
import GitHubIcon from '@mui/icons-material/GitHub';

const HomeLanding: React.FC = () => {
  const navigate = useNavigate();
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/signin');
            }}
            sx={{
              fontSize: '1.2rem',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            登入
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 10 }}>
        <ScrollAnimation>
          <RealTimeFeatureCard />
        </ScrollAnimation>
      </Box>
      <Box sx={{ my: 10 }}>
        <ScrollAnimation>
          <ListFeatureCard />
        </ScrollAnimation>
      </Box>
      <Box sx={{ my: 10 }}>
        <ScrollAnimation>
          <ChartFeatureCard />
        </ScrollAnimation>
      </Box>
      <AppFooter />
    </>
  );
};

export default HomeLanding;
