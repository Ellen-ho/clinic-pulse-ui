import React, { useState, useCallback } from 'react';
import { Container, Typography } from '@mui/material';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import FeedbackList from '../components/FeedbackList';
import FeedbackListFilters from '../components/FeedbackListFilters';
import { TimePeriodType } from '../../../../../types/Share';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface FilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientId?: string;
  feedbackRating?: number;
  page?: number;
  limit?: number;
}

const FeedbackListPage: React.FC = () => {
  const initialStartDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const initialEndDate = dayjs().endOf('month').format('YYYY-MM-DD');
  const defaultClinicId = '16458ab0-4bb6-4141-9bf0-6d7398942d9b';
  const [filters, setFilters] = useState<FilterValues>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    clinicId: defaultClinicId,
    timePeriod: undefined,
    doctorId: undefined,
    patientId: undefined,
    feedbackRating: undefined,
    page: 1,
    limit: 20,
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<FilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        反饋列表
      </Typography>
      <FeedbackListFilters onApply={handleApplyFilters} />
      <FeedbackList {...filters} />
    </Container>
  );
};

export default FeedbackListPage;
