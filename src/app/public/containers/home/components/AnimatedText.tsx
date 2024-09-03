import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const AnimatedTypography = styled(Typography)<TypographyProps>({
  animation: 'fadeInUp 2s ease forwards',
  opacity: 0,
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

export default AnimatedTypography;
