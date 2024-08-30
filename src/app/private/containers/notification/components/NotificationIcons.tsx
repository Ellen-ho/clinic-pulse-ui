import { NotificationType } from '../../../../../types/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface INotificationIconsProps {
  notificationType: NotificationType;
}

const NotificationIcons: React.FC<INotificationIconsProps> = ({
  notificationType,
}) => {
  const getCorrespondingIcon = (key: NotificationType) => {
    switch (key) {
      case NotificationType.NEGATIVE_FEEDBACK:
      case NotificationType.NEGATIVE_REVIEW:
        return <FeedbackIcon />;
      case NotificationType.ONSITE_CANCELLATION:
        return <SentimentVeryDissatisfiedIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return <>{getCorrespondingIcon(notificationType)}</>;
};

export default NotificationIcons;
