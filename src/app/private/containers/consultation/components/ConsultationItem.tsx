import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { IConsultationDetail } from '../../../../../types/Consultation';

interface IConsultationProps {
  consultation: IConsultationDetail;
  handleClickConsultation: (id: string) => void;
}
const ConsultationItem: React.FC<IConsultationProps> = ({
  consultation,
  handleClickConsultation,
}) => {
  return (
    <ListItemButton onClick={() => handleClickConsultation(consultation.id)}>
      <ListItemAvatar>
        <Avatar>
          <FlagCircleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            Consultation: {consultation.treatmentType}
            {consultation.consultationDate}
          </>
        }
        secondary={`consultationNumber: ${consultation.consultationNumber}`}
      />
    </ListItemButton>
  );
};

export default ConsultationItem;
