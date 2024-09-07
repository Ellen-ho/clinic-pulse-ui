import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';

import reportAdminUrl from '../../../../../../src/assets/admin_report.gif';
import reportDoctorUrl from '../../../../../../src/assets/doctor_report.png';

const StyledImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

const ChartFeatureCard: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: reportAdminUrl,
      text: '管理者可使用篩選器查看所有院區門診、反饋、評論相關統計數據及報表',
    },
    {
      src: reportDoctorUrl,
      text: '醫師可使用篩選器查看自己的門診、反饋相關統計數據及報表',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setCurrentImage(newValue as number);
  };

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <Grid
      container
      spacing={6}
      alignItems="center"
      sx={{ width: '80%', margin: '0 auto' }}
    >
      <Grid item xs={12} md={6}>
        <StyledImageContainer>
          <StyledImage src={images[currentImage].src} alt="Feature Image" />
        </StyledImageContainer>
        <Slider
          value={currentImage}
          min={0}
          max={images.length - 1}
          step={1}
          onChange={handleSliderChange}
          marks
          sx={{ mt: 2 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
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
        <List>
          {images.map((image, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleImageClick(index)}
              sx={{
                backgroundColor:
                  currentImage === index ? '#f0f0f0' : 'transparent',
                transition: 'all 0.3s ease',
                fontWeight: currentImage === index ? 'bold' : 'normal',
                transform: currentImage === index ? 'scale(1.05)' : 'scale(1)',
                boxShadow:
                  currentImage === index
                    ? '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    : 'none',
                padding: '16px',
                borderRadius: '8px',
              }}
            >
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText primary={image.text} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ChartFeatureCard;
