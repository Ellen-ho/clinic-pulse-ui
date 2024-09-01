export enum UserRoleType {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  ASSISTANT = 'ASSISTANT',
}

export interface IAccount {
  id: string;
  email: string;
  password: string;
}

export interface IPermission extends Record<string, any> {
  id: string;
  role: string;
  dashboardRead: boolean;
  consultationRead: boolean;
  feedbackSurveyRead: boolean;
  onlineReviewRead: boolean;
  reportCenterRead: boolean;
  timeSlotRead: boolean;
  staffManagementRead: boolean;
  staffManagementEdit: boolean;
  profileRead: boolean;
  profileEdit: boolean;
  createdAt: string;
  updatedAt: string;
}
