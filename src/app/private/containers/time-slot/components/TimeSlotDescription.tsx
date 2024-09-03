import React from 'react';
import { Box, Typography } from '@mui/material';

// Sample data
const scheduleData = [
  { color: '#F0FBFF', text: '早診 8:30 am ~ 12:00 pm' },
  { color: '#F2F0FF', text: '午診 2:30 pm ~ 5:30 pm' },
  { color: '#FFECEC', text: '晚診 6:30 pm ~ 9:30 pm' },
];

const TimeSlotDescription: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', gap: '20px' }}>
      {scheduleData.map((item, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              backgroundColor: item.color,
              border: '1px solid #1c252e',
            }}
          />
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TimeSlotDescription;
