export enum UserRoleType {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

export interface IAccount {
  id: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
