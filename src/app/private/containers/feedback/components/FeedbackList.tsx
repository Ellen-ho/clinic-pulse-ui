import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { IConsultationListItem } from '../../../../../types/Consultation';
import { getConsultationList } from '../../../../../services/ConsultationService';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';
import { TimePeriodType } from '../../../../../types/Share';
import { getFeedbackList } from '../../../../../services/FeedbackService';

interface IFeedbackListProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientId?: string;
  feedbackRating?: number;
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
  { label: '反饋日期', id: 'receivedAt', minWidth: 120 },
  { label: '院區', id: 'clinicName', minWidth: 120 },
  { label: '時段', id: 'consultationTimePeriod', minWidth: 120 },
  { label: '反饋星等', id: 'feedbackRating', minWidth: 120 },
  {
    label: '醫師',
    id: 'doctor',
    minWidth: 120,
    render: (value: any) => {
      return `${value.lastName}${value.firstName}`;
    },
  },
  {
    label: '當次門診',
    id: 'consultation',
    minWidth: 120,
  },
];

const FeedbackList: React.FC<IFeedbackListProps> = ({
  startDate,
  endDate,
  clinicId,
  timePeriod,
  doctorId,
  patientId,
  feedbackRating,
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
    if (feedbackRating) params.set('feedbackRating', String(feedbackRating));
    if (doctorId) params.set('doctorId', doctorId);
    if (patientId) params.set('patientId', patientId);
    params.set('page', String(page));
    params.set('limit', String(rowsPerPage));

    return params.toString();
  }, [
    startDate,
    endDate,
    clinicId,
    timePeriod,
    feedbackRating,
    doctorId,
    patientId,
    page,
    rowsPerPage,
  ]);

  const { data, error } = useSWR(`getFeedbackList?${queryString}`, () => {
    return getFeedbackList({ queryString });
  });

  const { data: feedbacks, totalCounts } = data || {};

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const handleClickFeedback = (id: string) => {
    navigate(`/feedback/${id}`);
  };

  return (
    <StickyHeadTable
      columns={columns}
      data={feedbacks || []}
      count={totalCounts || 0}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickFeedback}
    />
  );
};

export default FeedbackList;
