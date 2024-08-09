import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Paper, TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import React from 'react';
import { IConsultationListItem } from '../../../../../types/Consultation';
import { getConsultationList } from '../../../../../services/ConsultationService';

interface IConsultationListProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: string;
  totalDurationMin?: number;
  totalDurationMax?: number;
  patientId?: string;
  doctorId?: string;
}

interface ColumnData {
  dataKey: keyof IConsultationListItem | 'patient' | 'doctor';
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  { label: '患者', dataKey: 'patient', width: 120 },
  { label: '日期', dataKey: 'consultationDate', width: 120 },
  { label: '時段', dataKey: 'consultationTimePeriod', width: 120 },
  { label: '號碼', dataKey: 'consultationNumber', width: 120, numeric: true },
  { label: '治療', dataKey: 'treatmentType', width: 120 },
  {
    label: '總時長(分鐘)',
    dataKey: 'totalDuration',
    width: 120,
    numeric: true,
  },
  { label: '醫師', dataKey: 'doctor', width: 120 },
];

const ConsultationList: React.FC<IConsultationListProps> = ({
  startDate,
  endDate,
  clinicId,
  timePeriod,
  totalDurationMin,
  totalDurationMax,
  doctorId,
  patientId,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

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
    if (patientId) params.set('patientId', patientId);
    params.set('page', String(page || 1));
    params.set('limit', String(20));

    return params.toString();
  }, [
    startDate,
    endDate,
    clinicId,
    timePeriod,
    totalDurationMin,
    totalDurationMax,
    doctorId,
    patientId,
    page,
  ]);

  const { data, error } = useSWR(`getConsultationList?${queryString}`, () => {
    return getConsultationList({ queryString });
  });

  const handleClickConsultation = (id: string) => {
    navigate(`/consultation/${id}`);
  };

  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.dataKey} sx={{ width: `${column.width}` }}>
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index: number, row: IConsultationListItem) => (
    <TableRow
      key={row.id}
      onClick={() => handleClickConsultation(row.id)}
      sx={{ cursor: 'pointer' }}
    >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
          sx={{ width: `${column.width}` }}
        >
          {column.dataKey === 'patient'
            ? `${row.patient.firstName} ${row.patient.lastName}`
            : column.dataKey === 'doctor'
            ? `${row.doctor.firstName} ${row.doctor.lastName}`
            : row[column.dataKey]}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={data?.data || []}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default ConsultationList;
