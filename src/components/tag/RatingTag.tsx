import React from 'react';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';

interface IRatingTagProps {
  value: number;
}

const RatingTag: React.FC<IRatingTagProps> = ({ value }) => {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Rating value={value} readOnly />
    </Box>
  );
};

export default RatingTag;
