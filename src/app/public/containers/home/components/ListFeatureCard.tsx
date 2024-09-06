import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Slider,
  Box,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import consultationListUrl from '../../../../../../src/assets/consultation_list.gif';
import listDoctorUrl from '../../../../../../src/assets/list_doctor.gif';
import feedbackUrl from '../../../../../../src/assets/feedback.gif';
import detailUrl from '../../../../../../src/assets/detail.png';

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

const ListFeatureCard: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: consultationListUrl,
      text: '管理者可使用篩選器查看所有院區的歷史門診紀錄列表',
    },
    {
      src: listDoctorUrl,
      text: '醫師可使用篩選器查看自己的歷史門診紀錄列表',
    },
    {
      src: feedbackUrl,
      text: '反饋紀錄: 管理者可看到各院區的問卷反饋和 Google 評論，醫師可看到自己門診的問卷反饋',
    },
    {
      src: detailUrl,
      text: '點擊門診列表上任一筆紀錄或是反饋列表對應的門診連結，可進到門診詳情',
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
      <Grid item xs={12} md={8}>
        <Typography variant="h6" color="primary" gutterBottom>
          紀錄列表
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          快速篩選與定位問題，提升診療效率
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          提供條件篩選功能，能夠根據需要查找具體的看診、反饋、評論紀錄，迅速找出問題並採取相應措施
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
    </Grid>
  );
};

export default ListFeatureCard;
