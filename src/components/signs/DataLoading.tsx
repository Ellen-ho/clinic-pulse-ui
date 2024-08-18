import React, { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface IDataLoading {
  label?: string;
  children?: ReactNode;
}

const DataLoading: React.FC<IDataLoading> = ({ label = '', children = '' }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff66',
      }}
    >
      <CircularProgress /> <span>{label}</span>
      {children}
    </Box>
  );
};

export default DataLoading;
