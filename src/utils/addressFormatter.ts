import { IAddress } from '../types/Doctors';

const addressFormatter = (location: IAddress): string => {
  const { line1, line2, city, stateProvince, postalCode, country } = location;
  return `${line1}, ${line2}, ${city}, ${stateProvince}, ${postalCode}, ${country}`;
};

export default addressFormatter;
