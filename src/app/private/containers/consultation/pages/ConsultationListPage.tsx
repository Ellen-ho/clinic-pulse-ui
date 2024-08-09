import React, { useState, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import ConsultationListFilters from '../components/ConsultationListFilters';
import ConsultationList from '../components/ConsultationList';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import useSWR from 'swr';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface FilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: string;
  totalDurationMin?: number;
  totalDurationMax?: number;
  patientId?: string;
  doctorId?: string;
  page?: number;
  limit?: number;
}

const ConsultationListPage: React.FC = () => {
  const initialStartDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const initialEndDate = dayjs().endOf('month').format('YYYY-MM-DD');
  const defaultClinicId = '16458ab0-4bb6-4141-9bf0-6d7398942d9b';
  const [filters, setFilters] = useState<FilterValues>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    clinicId: defaultClinicId,
    timePeriod: undefined,
    totalDurationMin: undefined,
    totalDurationMax: undefined,
    patientId: undefined,
    doctorId: undefined,
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
        Consultation List
      </Typography>
      <ConsultationListFilters onApply={handleApplyFilters} />
      <ConsultationList {...filters} />
    </Container>
  );
};

export default ConsultationListPage;
