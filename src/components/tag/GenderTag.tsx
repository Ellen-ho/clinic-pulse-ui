import React from 'react';
import { Chip } from '@mui/material';
import { GenderType } from '../../types/Share';
import { GenderTypeMap } from '../../constant/consultation';

interface IGenderTagProps {
  type: GenderType;
}

const GenderTag: React.FC<IGenderTagProps> = ({ type }) => {
  const label = GenderTypeMap[type];
  const color = type === GenderType.MALE ? '#93BCE3' : '#ffccc4';
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{ borderColor: color, color }}
    />
  );
};

export default GenderTag;
