import React, { ReactNode } from 'react';
import { Box, CircularProgress, SxProps, Theme } from '@mui/material';

interface IDataLoading {
  label?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const DataLoading: React.FC<IDataLoading> = ({
  label = '',
  children = '',
  sx = {},
}) => {
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
        ...sx,
      }}
    >
      <CircularProgress /> <span>{label}</span>
      {children}
    </Box>
  );
};

export default DataLoading;
