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
    limit: 25,
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<FilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newStartDate = params.get('startDate');
    const newEndDate = params.get('endDate');
    const newClinicId = params.get('clinicId');
    const newTimePeriod = params.get('timePeriod');
    const newTotalDurationMin = params.get('totalDurationMin');
    const newTotalDurationMax = params.get('totalDurationMax');
    const newDoctorId = params.get('doctorId');
    const newPatientName = params.get('patientName');
    const newPage = parseInt(params.get('page') || '1', 10);
    const newLimit = parseInt(params.get('limit') || '25', 10);

    setFilters((prev) => ({
      ...prev,
      startDate: newStartDate || prev.startDate,
      endDate: newEndDate || prev.endDate,
      clinicId: newClinicId || prev.clinicId,
      timePeriod: newTimePeriod || prev.timePeriod,
      totalDurationMin: newTotalDurationMin
        ? parseInt(newTotalDurationMin, 10)
        : prev.totalDurationMin,
      totalDurationMax: newTotalDurationMax
        ? parseInt(newTotalDurationMax, 10)
        : prev.totalDurationMax,
      doctorId: newDoctorId || prev.doctorId,
      patientId: newPatientName || prev.patientId,
      page: newPage || prev.page,
      limit: newLimit || prev.limit,
    }));
  }, []);

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
            overflowY: 'hidden',
          }}
        >
          <ConsultationList {...filters} />
        </Box>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationListPage;
