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
