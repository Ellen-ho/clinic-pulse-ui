import React from 'react';
import { Box, Typography } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';

const UnderConstructionSign: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <EngineeringIcon fontSize="large" />
      <Typography align="center" variant="subtitle2">
        Under Construction!
      </Typography>
    </Box>
  );
};

export default UnderConstructionSign;
