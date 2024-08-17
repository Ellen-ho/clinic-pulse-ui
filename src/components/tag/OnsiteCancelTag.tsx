import { Chip } from '@mui/material';
import { OnsiteCancelReasonMap } from '../../constant/consultation';
import { OnsiteCancelReasonType } from '../../types/Consultation';

interface IOnsiteCancelTagProps {
  type: OnsiteCancelReasonType;
}

const OnsiteCancelTag: React.FC<IOnsiteCancelTagProps> = ({ type }) => {
  const label = OnsiteCancelReasonMap[type];
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{
        borderColor: '#A40000',
        color: '#A40000',
        minWidth: '100px',
        textAlign: 'center',
      }}
    />
  );
};
export default OnsiteCancelTag;
