import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { getConsultationList } from '../../../../../services/ConsultationService';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import {
  GenderType,
  TimePeriodType,
  TreatmentType,
} from '../../../../../types/Share';
import TreatmentTag from '../../../../../components/tag/TreatmentTag';
import GenderTag from '../../../../../components/tag/GenderTag';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FilterValues } from '../pages/ConsultationListPage';

interface IConsultationListProps {
  onApply: (filters: FilterValues) => void;
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: string;
  totalDurationMin?: number;
  totalDurationMax?: number;
  patientName?: string;
  doctorId?: string;
}

const columns: IColumn[] = [
  {
    label: '患者',
    id: 'patient',
    minWidth: 120,
    render: (value: any) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {`${value.lastName}${value.firstName}`}
          <GenderTag type={value.gender as GenderType} />{' '}
        </div>
      );
    },
  },
  { label: '日期', id: 'consultationDate', minWidth: 120 },
  {
    label: '時段',
    id: 'consultationTimePeriod',
    minWidth: 120,
    render: (value: TimePeriodType) => {
      return <ConsultationTimePeriodTag type={value} />;
    },
  },
  { label: '號碼', id: 'consultationNumber', minWidth: 120 },
  {
    label: '治療',
    id: 'treatmentType',
    minWidth: 120,
    render: (value: TreatmentType) => {
      return <TreatmentTag type={value} />;
    },
  },
  {
    label: '總時長(分鐘)',
    id: 'totalDuration',
    minWidth: 120,
  },
  {
    label: '醫師',
    id: 'doctor',
    minWidth: 120,
    render: (value: any) => {
      return `${value.lastName}${value.firstName}`;
    },
  },
  {
    label: '退掛',
    id: 'isOnsiteCanceled',
    minWidth: 120,
    render: (value: boolean) => {
      if (value) {
        return <Typography sx={{ color: '#A40000' }}>退掛</Typography>;
      }
      return null;
    },
  },
];

const ConsultationList: React.FC<IConsultationListProps> = ({
  onApply,
  startDate,
  endDate,
  clinicId,
  timePeriod,
  totalDurationMin,
  totalDurationMax,
  doctorId,
  patientName,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(
    parseInt(queryParams.get('page') || '1', 10),
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    parseInt(queryParams.get('limit') || '25', 10),
  );

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (clinicId) params.set('clinicId', clinicId);
    if (timePeriod) params.set('timePeriod', timePeriod);
    if (totalDurationMin !== undefined)
      params.set('totalDurationMin', String(totalDurationMin));
    if (totalDurationMax !== undefined)
      params.set('totalDurationMax', String(totalDurationMax));
    if (doctorId) params.set('doctorId', doctorId);
    if (patientName) params.set('patientName', patientName);
    params.set('page', String(page));
    params.set('limit', String(rowsPerPage));

    return params.toString();
  }, [
    startDate,
    endDate,
    clinicId,
    timePeriod,
    totalDurationMin,
    totalDurationMax,
    doctorId,
    patientName,
    page,
    rowsPerPage,
  ]);

  const { data, isLoading } = useSWR(
    `getConsultationList?${queryString}`,
    () => {
      return getConsultationList({ queryString });
    },
  );

  const { data: consultations, totalCounts } = data || {};

  const maxPage = totalCounts ? Math.ceil(totalCounts / rowsPerPage) : 1;
  const effectivePage = Math.max(0, Math.min(page - 1, maxPage - 1));

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleClickConsultation = (id: string) => {
    navigate(`/consultation/${id}`, {
      state: {
        from: {
          pathname: window.location.pathname,
          search: window.location.search,
        },
      },
    });
  };

  return (
    <StickyHeadTable
      columns={columns}
      data={consultations || []}
      count={totalCounts || 0}
      page={effectivePage}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickConsultation}
      isLoading={isLoading}
    />
  );
};

export default ConsultationList;
