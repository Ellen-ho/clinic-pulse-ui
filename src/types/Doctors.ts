import { GenderType } from './Share';

export interface IDoctors {
  id: string;
  fullName: string;
}

export interface IDoctor {
  avatar: string | null;
  firstName: string;
  lastName: string;
  gender: GenderType;
  birthDate: Date;
  onboardDate: Date;
  resignationDate: Date | null;
  email: string;
}
