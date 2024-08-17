import React from 'react';
import { Chip } from '@mui/material';
import { TimePeriodType } from '../../types/Share';
import { ConsultationTimePeriodMap } from '../../constant/consultation';

interface IConsultationTimePeriodTagProps {
  type: TimePeriodType;
}

const ConsultationTimePeriodTag: React.FC<IConsultationTimePeriodTagProps> = ({
  type,
}) => {
  const label = ConsultationTimePeriodMap[type];
  return <Chip label={label} size="small" variant="outlined" />;
};

export default ConsultationTimePeriodTag;
