import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { AuthContext } from '../../../../../context/AuthContext';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import ReviewListFilters from '../component/ReviewListFilters';
import ReviewList from '../component/ReviewList';
import queryString from 'query-string';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export interface ReviewFilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  patientName?: string;
  reviewRating?: number;
  page?: number;
  limit?: number;
}

const ReviewListPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const parsed = queryString.parse(location.search);
  const [filters, setFilters] = useState<ReviewFilterValues>({
    startDate:
      (parsed?.startDate as string) ??
      dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: (parsed?.endDate as string) ?? dayjs().format('YYYY-MM-DD'),
    clinicId: parsed?.clinicId as string,
    patientName: parsed?.patientName as string,
    reviewRating: parsed?.reviewRating
      ? Number(parsed.reviewRating)
      : undefined,
    page: 1,
    limit: 25,
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<ReviewFilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Typography variant="h4" gutterBottom>
          Google 評論列表
        </Typography>
        <ReviewListFilters onApply={handleApplyFilters} initFilters={filters} />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        >
          <ReviewList {...filters} onApply={handleApplyFilters} />
        </Box>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ReviewListPage;
