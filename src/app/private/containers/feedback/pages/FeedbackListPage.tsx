import React, { useState, useCallback, useContext } from 'react';
import { Container, Typography } from '@mui/material';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import FeedbackList from '../components/FeedbackList';
import FeedbackListFilters from '../components/FeedbackListFilters';
import { TimePeriodType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import { UserRoleType } from '../../../../../types/Users';
import { useFiltersContext } from '../../../../../context/FiltersContext';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface FilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  patientName?: string;
  feedbackRating?: number;
  page?: number;
  limit?: number;
}

const FeedbackListPage: React.FC = () => {
  const initialStartDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
  const initialEndDate = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId || '';
  const isDoctor = state.doctorId != null;
  const [filters, setFilters] = useState<FilterValues>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    clinicId: undefined,
    timePeriod: undefined,
    doctorId: isDoctor ? doctorId : undefined,
    patientName: undefined,
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
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        反饋列表
      </Typography>
      <FeedbackListFilters onApply={handleApplyFilters} />
      <FeedbackList {...filters} />
    </Container>
  );
};

export default FeedbackListPage;
