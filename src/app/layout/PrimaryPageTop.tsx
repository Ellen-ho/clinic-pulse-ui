import { Typography } from '@mui/material';
import { PrimaryPageTopWrapper } from './PrimaryPageTop.styled';

interface IPrimaryPageTopWrapperProps {
  pageTitle: string;
  rightElement?: React.ReactNode;
}
const PrimaryPageTop: React.FC<IPrimaryPageTopWrapperProps> = ({
  pageTitle,
  rightElement,
}) => {
  return (
    <PrimaryPageTopWrapper>
      <Typography variant="h5">{pageTitle}</Typography>
      {rightElement}
    </PrimaryPageTopWrapper>
  );
};

export default PrimaryPageTop;
