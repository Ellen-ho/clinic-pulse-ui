import { Chip } from '@mui/material';
import { ConsultationStatus } from '../../types/Consultation';
import { ConsultationStatusMap } from '../../constant/consultation';

interface IConsultationStatusTagProps {
  type: ConsultationStatus;
}

const ConsultationTimePeriodTag: React.FC<IConsultationStatusTagProps> = ({
  type,
}) => {
  const label = ConsultationStatusMap[type];
  return <Chip label={label} size="small" variant="outlined" />;
};

export default ConsultationTimePeriodTag;
