import React, { useState, useCallback, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ConsultationListFilters from '../components/ConsultationListFilters';
import ConsultationList from '../components/ConsultationList';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { AuthContext } from '../../../../../context/AuthContext';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';

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
    totalDurationMin: undefined,
    totalDurationMax: undefined,
    patientId: undefined,
    doctorId: isDoctor ? doctorId : undefined,
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
    <PrimaryPageContent>
      <CommonWrapper>
        <Typography variant="h4" gutterBottom>
          看診紀錄列表
        </Typography>
        <ConsultationListFilters onApply={handleApplyFilters} />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <ConsultationList {...filters} />
        </Box>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationListPage;
