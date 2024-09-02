import React, { ReactNode } from 'react';
import { FcFinePrint } from 'react-icons/fc';
import { Box, SxProps, Theme } from '@mui/material';

interface INoDataFound {
  icon?: ReactNode;
  label?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

const NoDataFound: React.FC<INoDataFound> = ({
  icon = (
    <FcFinePrint
      size={100}
      style={{
        transform: 'translateX(13px)',
      }}
    />
  ),
  label,
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
        gap: '10px',
        fontSize: '16px',
        ...sx,
      }}
    >
      {icon}
      <Box paddingLeft={'1rem'}>{label || '無資料符合您的搜尋條件'}</Box>
      {children}
    </Box>
  );
};

export default NoDataFound;
