import { Chip } from '@mui/material';
import { SelectedContentMap } from '../../constant/feedback';
import { SelectedContent } from '../../types/Feedback';

interface IFeedbackSelectedContentTagProps {
  type: SelectedContent;
}

const FeedbackSelectedContentTag: React.FC<
  IFeedbackSelectedContentTagProps
> = ({ type }) => {
  const label = SelectedContentMap[type];
  console.log('Type:', type);
  console.log('SelectedContentMap:', SelectedContentMap);
  console.log('Label:', SelectedContentMap[type]);
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
export default FeedbackSelectedContentTag;
