import React, { ReactElement } from 'react';
import { Box } from '@mui/material';

interface ICenterTextProps {
  children: ReactElement;
}

const CenterText: React.FC<ICenterTextProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default CenterText;
