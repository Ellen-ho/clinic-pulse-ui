import React, { ReactNode } from 'react';
import { DataLoadingStyled } from './DataLoading.styled';
import { CircularProgress } from '@mui/material';

interface IDataLoading {
  label?: string;
  children?: ReactNode;
}

const DataLoading: React.FC<IDataLoading> = ({ label, children = '' }) => {
  return (
    <DataLoadingStyled>
      <CircularProgress /> <span>{label || 'Data loading...'}</span>
      {children}
    </DataLoadingStyled>
  );
};

export default DataLoading;
