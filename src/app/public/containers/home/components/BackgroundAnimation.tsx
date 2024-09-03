import { styled } from '@mui/material/styles';

const Background = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  animation: 'backgroundAnimation 15s ease infinite',
  '@keyframes backgroundAnimation': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

export default Background;
