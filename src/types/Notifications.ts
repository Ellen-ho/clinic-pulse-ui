export enum NotificationType {
  NEGATIVE_FEEDBACK = 'NEGATIVE_FEEDBACK',
  NEGATIVE_REVIEW = 'NEGATIVE_REVIEW',
  ABNORMAL_CONSULTATION_WAIT_TIME = 'ABNORMAL_CONSULTATION_WAIT_TIME',
  ABNORMAL_BED_WAIT_TIME = 'ABNORMAL_BED_WAIT_TIME',
  ABNORMAL_ACUPUNCTURE_WAIT_TIME = 'ABNORMAL_ACUPUNCTURE_WAIT_TIME',
  ABNORMAL_NEEDLE_REMOVAL_WAIT_TIME = 'ABNORMAL_NEEDLE_REMOVAL_WAIT_TIME',
  ABNORMAL_MEDICATION_WAIT_TIME = 'ABNORMAL_MEDICATION_WAIT_TIME',
  ONSITE_CANCELLATION = 'ONSITE_CANCELLATION',
}

export interface INotification {
  id: string;
  title: string;
  isRead: boolean;
  content: string;
  notificationType: NotificationType;
  referenceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
