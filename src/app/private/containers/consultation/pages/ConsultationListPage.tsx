import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ConsultationListFilters from '../components/ConsultationListFilters';
import ConsultationList from '../components/ConsultationList';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { AuthContext } from '../../../../../context/AuthContext';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export interface FilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: string;
  totalDurationMin?: number;
  totalDurationMax?: number;
  patientName?: string;
  doctorId?: string;
  page?: number;
  limit?: number;
}

const ConsultationListPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const parsed = queryString.parse(location.search);

  const isDoctor = state.doctorId != null;

  const [filters, setFilters] = useState<FilterValues>({
    startDate:
      (parsed?.startDate as string) ??
      dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
    endDate: (parsed?.endDate as string) ?? dayjs().format('YYYY-MM-DD'),
    clinicId: parsed?.clinicId as string,
    timePeriod: parsed?.timePeriod as string,
    totalDurationMin: parsed?.totalDurationMin
      ? Number(parsed?.totalDurationMin as string)
      : undefined,
    totalDurationMax: parsed?.totalDurationMax
      ? Number(parsed?.totalDurationMax as string)
      : undefined,
    patientName: parsed?.patientName as string,
    doctorId: isDoctor
      ? (state.doctorId as string)
      : (parsed?.doctorId as string),
    page: parsed?.page ? Number(parsed?.page as string) : 1,
    limit: parsed?.limit ? Number(parsed?.limit as string) : 25,
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
        <ConsultationListFilters
          onApply={handleApplyFilters}
          initFilters={filters}
        />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        >
          <ConsultationList {...filters} onApply={handleApplyFilters} />
        </Box>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationListPage;
