import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StickyHeadTable, {
  IColumn,
} from '../../../../../components/table/StickyHeadTable';
import RatingTag from '../../../../../components/tag/RatingTag';
import { Typography } from '@mui/material';
import useSWR from 'swr';
import { getReviewList } from '../../../../../services/ReviewService';

interface IReviewListProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  patientName?: string;
  reviewRating?: number;
}

const ReviewList: React.FC<IReviewListProps> = ({
  startDate,
  endDate,
  clinicId,
  patientName,
  reviewRating,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(
    parseInt(queryParams.get('page') || '1', 10),
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    parseInt(queryParams.get('limit') || '10', 10),
  );

  const columns: IColumn[] = [
    {
      label: '評論者',
      id: 'reviewer',
      minWidth: 120,
      render: (value: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {`${value.name}`}
          </div>
        );
      },
    },
    { label: '評論日期', id: 'receivedDate', minWidth: 120 },
    { label: '院區', id: 'clinicName', minWidth: 120 },
    {
      label: '評論星等',
      id: 'reviewRating',
      minWidth: 120,
      render: (value: number) => {
        return <RatingTag value={value} />;
      },
    },
    {
      label: '回覆日期',
      id: 'response',
      minWidth: 120,
      render: (value: any) => {
        return value.responseDate ? value.responseDate : '';
      },
    },
    {
      label: '評論連結',
      id: 'link',
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
              if (typeof value === 'string' && value.startsWith('https://')) {
                window.open(value, '_blank');
              } else {
                console.warn('Invalid link:', value);
              }
            }}
          >
            查看評論
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
    if (reviewRating) params.set('reviewRating', String(reviewRating));
    if (patientName) params.set('patientName', patientName);
    params.set('page', String(page));
    params.set('limit', String(rowsPerPage));

    return params.toString();
  }, [
    startDate,
    endDate,
    clinicId,
    reviewRating,
    patientName,
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    const newUrl = `${window.location.pathname}?${queryString}`;
    navigate(newUrl, { replace: true });
  }, [queryString, navigate]);

  const { data, isLoading } = useSWR(`getReviewList?${queryString}`, () => {
    return getReviewList({ queryString });
  });

  const { data: reviews, totalCounts } = data || {};

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

  const handleClickReview = (id: string) => {
    navigate(`/review/${id}`, {
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
      sx={{ height: '100%' }}
      columns={columns}
      data={reviews || []}
      count={totalCounts || 0}
      page={effectivePage}
      rowsPerPage={rowsPerPage}
      isLoading={isLoading}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onRowClick={handleClickReview}
    />
  );
};

export default ReviewList;
