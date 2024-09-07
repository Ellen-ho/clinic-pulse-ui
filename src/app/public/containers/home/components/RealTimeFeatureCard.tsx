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

import realTimeNav from '../../../../../../src/assets/real_time_admin.png';
import realTimeAdminFilter from '../../../../../../src/assets/real_time_filter.gif';
import realTimeDoctor from '../../../../../../src/assets/real_time_doctor.png';

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
  objectFit: 'contain',
  display: 'block',
});

const RealTimeFeatureCard: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: realTimeNav,
      text: '各院區門診即時等待時間及即時現況',
    },
    {
      src: realTimeAdminFilter,
      text: '管理者可使用篩選器查看不同院區跟診間即時現況',
    },
    {
      src: realTimeDoctor,
      text: '醫師的即時頁面會自動帶出其正在進行中的門診即時資訊',
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
      <Grid item xs={12} md={4}>
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

      <Grid item xs={12} md={8}>
        <Typography variant="h6" color="primary" gutterBottom>
          即時資訊
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          即時掌握診所看診狀況，優化醫療服務品質
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          隨時接收最新的看診資訊，迅速了解診所目前的看診情況，幫助醫療團隊高效管理和調整服務
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

export default RealTimeFeatureCard;
