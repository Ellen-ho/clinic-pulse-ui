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
    const newTimePeriod = params.get('timePeriod') as
      | TimePeriodType
      | undefined;
    const newDoctorId = params.get('doctorId');
    const newPatientName = params.get('patientName');
    const newFeedbackRating = params.get('feedbackRating')
      ? parseInt(params.get('feedbackRating') as string, 10)
      : undefined;
    const newPage = parseInt(params.get('page') || '1', 10);
    const newLimit = parseInt(params.get('limit') || '25', 10);

    setFilters((prev) => ({
      ...prev,
      startDate: newStartDate || prev.startDate,
      endDate: newEndDate || prev.endDate,
      clinicId: newClinicId || prev.clinicId,
      timePeriod: newTimePeriod || prev.timePeriod,
      doctorId: newDoctorId || prev.doctorId,
      patientName: newPatientName || prev.patientName,
      feedbackRating:
        newFeedbackRating !== undefined
          ? newFeedbackRating
          : prev.feedbackRating,
      page: newPage || prev.page,
      limit: newLimit || prev.limit,
    }));
  }, []);

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Typography variant="h4" gutterBottom>
          反饋列表
        </Typography>
        <FeedbackListFilters onApply={handleApplyFilters} />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        ></Box>
        <FeedbackList {...filters} />
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default FeedbackListPage;
