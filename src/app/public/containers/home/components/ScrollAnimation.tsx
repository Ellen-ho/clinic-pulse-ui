import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(100px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollAnimation;
