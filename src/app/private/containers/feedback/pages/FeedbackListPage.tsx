import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import FeedbackList from '../components/FeedbackList';
import FeedbackListFilters from '../components/FeedbackListFilters';
import { TimePeriodType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import queryString from 'query-string';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export interface FeedbackFilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: string;
  feedbackRating?: number;
  doctorId?: string;
  patientName?: string;
  page?: number;
  limit?: number;
}

const FeedbackListPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const parsed = queryString.parse(location.search);
  const isDoctor = state.doctorId != null;
  const [filters, setFilters] = useState<FeedbackFilterValues>({
    startDate:
      (parsed?.startDate as string) ??
      dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: (parsed?.endDate as string) ?? dayjs().format('YYYY-MM-DD'),
    clinicId: parsed?.clinicId as string,
    timePeriod: parsed?.timePeriod as string,
    feedbackRating: parsed?.feedbackRating
      ? Number(parsed.feedbackRating)
      : undefined,
    doctorId: isDoctor
      ? (state.doctorId as string)
      : (parsed?.doctorId as string),
    patientName: parsed?.patientName as string,
    page: parsed?.page ? Number(parsed?.page as string) : 1,
    limit: parsed?.limit ? Number(parsed?.limit as string) : 10,
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<FeedbackFilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Typography variant="h4" gutterBottom>
          反饋列表
        </Typography>
        <FeedbackListFilters
          onApply={handleApplyFilters}
          initFilters={filters}
        />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        >
          <FeedbackList {...filters} onApply={handleApplyFilters} />
        </Box>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default FeedbackListPage;
