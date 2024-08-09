import React, { ReactNode } from 'react';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { NoDataFoundStyled } from './NoDataFound.styled';
import { Box } from '@mui/material';

interface INoDataFound {
  icon?: ReactNode;
  label?: string;
  children?: ReactNode;
}

const NoDataFound: React.FC<INoDataFound> = ({
  icon = <InfoTwoToneIcon fontSize="small" />,
  label,
  children = '',
}) => {
  return (
    <NoDataFoundStyled>
      {icon}{' '}
      <Box paddingLeft={'1rem'}>{label || 'There is no data found.'}</Box>
      {children}
    </NoDataFoundStyled>
  );
};

export default NoDataFound;
