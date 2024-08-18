import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { IConsultationListItem } from '../../../../../types/Consultation';
import { getConsultationList } from '../../../../../services/ConsultationService';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';
import { GenderType, TimePeriodType } from '../../../../../types/Share';
import { getFeedbackList } from '../../../../../services/FeedbackService';
import GenderTag from '../../../../../components/tag/GenderTag';
import ConsultationTimePeriodTag from '../../../../../components/tag/ConsultationTimePeriodTag';
import RatingTag from '../../../../../components/tag/RatingTag';
import { Typography } from '@mui/material';

interface IFeedbackListProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientName?: string;
  feedbackRating?: number;
}

const FeedbackList: React.FC<IFeedbackListProps> = ({
  startDate,
  endDate,
  clinicId,
  timePeriod,
  doctorId,
  patientName,
  feedbackRating,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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
    { label: '反饋日期', id: 'receivedDate', minWidth: 120 },
    { label: '院區', id: 'clinicName', minWidth: 120 },
    {
      label: '時段',
      id: 'consultationTimePeriod',
      minWidth: 120,
      render: (value: TimePeriodType) => {
        return <ConsultationTimePeriodTag type={value} />;
      },
    },
    {
      label: '反饋星等',
      id: 'feedbackRating',
      minWidth: 120,
      render: (value: number) => {
        return <RatingTag value={value} />;
      },
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
      label: '當次門診',
      id: 'consultationId',
      minWidth: 120,
      render: (value: any) => {
        return (
          <Typography
            variant="body2"
            sx={{
              color: 'blue',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                color: 'darkblue',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/consultation/${value}`);
            }}
          >
            查看門診
          </Typography>
        );
      },
    },
  ];

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (clinicId) params.set('clinicId', clinicId);
    if (timePeriod) params.set('timePeriod', timePeriod);
    if (feedbackRating) params.set('feedbackRating', String(feedbackRating));
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
    feedbackRating,
    doctorId,
    patientName,
    page,
    rowsPerPage,
  ]);

  const { data, isLoading } = useSWR(`getFeedbackList?${queryString}`, () => {
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
    setPage(1);
  };

  const handleClickFeedback = (id: string) => {
    navigate(`/feedback/${id}`);
  };

  return (
    <StickyHeadTable
      sx={{ height: '100%' }}
      columns={columns}
      data={feedbacks || []}
      count={totalCounts || 0}
      page={page}
      rowsPerPage={rowsPerPage}
      isLoading={isLoading}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickFeedback}
    />
  );
};

export default FeedbackList;
