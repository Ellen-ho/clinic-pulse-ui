import React from 'react';
import { Chip } from '@mui/material';
import { TreatmentType } from '../../types/Share';
import { TreatmentTypeMap } from '../../constant/consultation';

interface ITreatmentTagProps {
  type: TreatmentType;
}

const TreatmentTag: React.FC<ITreatmentTagProps> = ({ type }) => {
  const label = TreatmentTypeMap[type];
  return <Chip label={label} size="small" variant="outlined" />;
};

export default TreatmentTag;
