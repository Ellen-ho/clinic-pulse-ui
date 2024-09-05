import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';

import iconBgUrl from '../../../../../../src/assets/real_time_icon.png';
import realTimeGif from '../../../../../../src/assets/real_time_admin.gif';

const StyledImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '8px',
}));

const RealTimeFeatureCard: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(iconBgUrl);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    {
      src: realTimeGif,
      text: '各院區門診即時等待時間及即時現況',
    },
  ];

  const handleListItemClick = (index: number, src: string) => {
    setCurrentImage(src);
    setSelectedIndex(index);
  };

  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      sx={{ width: '80%', margin: '0 auto' }}
    >
      <Grid item xs={12} md={4}>
        <StyledImage
          component="img"
          src={currentImage}
          alt="Feature Image"
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
              onClick={() => handleListItemClick(index, image.src)}
              sx={{
                backgroundColor:
                  selectedIndex === index ? '#f0f0f0' : 'transparent',
                transition: 'background-color 0.3s ease',
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
