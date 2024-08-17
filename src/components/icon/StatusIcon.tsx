import { FC } from 'react';
import { FaSpinner, FaExclamationTriangle, FaBoxOpen } from 'react-icons/fa';
import { LuConstruction } from 'react-icons/lu';

export enum STATUS {
  LOADING = 'loading',
  ERROR = 'error',
  NO_DATA = 'noData',
  UNDER_CONSTRUCTION = 'under_construction',
}

interface IStatusIconProps {
  status: STATUS;
}

const StatusIcon: FC<IStatusIconProps> = ({ status }) => {
  switch (status) {
    case STATUS.LOADING:
      return <FaSpinner />;
    case STATUS.ERROR:
      return <FaExclamationTriangle />;
    case STATUS.NO_DATA:
      return <FaBoxOpen />;
    case STATUS.UNDER_CONSTRUCTION:
      return <LuConstruction />;
    default:
      return null;
  }
};

export default StatusIcon;
