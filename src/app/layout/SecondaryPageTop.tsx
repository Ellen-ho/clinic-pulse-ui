import { IconButton } from '@mui/material';
import { SecondaryPageTopWrapper } from './SecondaryPageTop.styled';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ISecondaryPageTopWrapperProps {
  onBack?: () => void;
  rightElement?: React.ReactNode;
}
const SecondaryPageTop: React.FC<ISecondaryPageTopWrapperProps> = ({
  rightElement,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    onBack ? onBack() : navigate(-1);
  };

  return (
    <SecondaryPageTopWrapper>
      <IconButton aria-label="back" onClick={handleBack} size="small">
        <ArrowBackIcon />
      </IconButton>
      {rightElement}
    </SecondaryPageTopWrapper>
  );
};

export default SecondaryPageTop;
