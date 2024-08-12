import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { IConsultationListItem } from '../../../../../types/Consultation';
import { getConsultationList } from '../../../../../services/ConsultationService';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';

interface IConsultationListProps {
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
      return `${value.lastName}${value.firstName}`;
    },
  },
  { label: '日期', id: 'consultationDate', minWidth: 120 },
  { label: '時段', id: 'consultationTimePeriod', minWidth: 120 },
  { label: '號碼', id: 'consultationNumber', minWidth: 120 },
  { label: '治療', id: 'treatmentType', minWidth: 120 },
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
];

const ConsultationList: React.FC<IConsultationListProps> = ({
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
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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

  const { data, error } = useSWR(`getConsultationList?${queryString}`, () => {
    return getConsultationList({ queryString });
  });

  const { data: consultations, totalCounts } = data || {};

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handleClickConsultation = (id: string) => {
    navigate(`/consultation/${id}`);
  };

  return (
    <StickyHeadTable
      columns={columns}
      data={consultations || []}
      count={totalCounts || 0}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickConsultation}
    />
  );
};

export default ConsultationList;
