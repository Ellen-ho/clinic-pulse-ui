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

dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface FilterValues {
  startDate: string;
  endDate: string;
  clinicId?: string;
  patientName?: string;
  reviewRating?: number;
  page?: number;
  limit?: number;
}

const ReviewListPage: React.FC = () => {
  const initialStartDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
  const initialEndDate = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
  const { state } = useContext(AuthContext);
  const [filters, setFilters] = useState<FilterValues>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    clinicId: undefined,
    patientName: undefined,
    reviewRating: undefined,
    page: 1,
    limit: 25,
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<FilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const newStartDate = params.get('startDate');
  //   const newEndDate = params.get('endDate');
  //   const newClinicId = params.get('clinicId');
  //   const newTimePeriod = params.get('timePeriod') as
  //     | TimePeriodType
  //     | undefined;
  //   const newDoctorId = params.get('doctorId');
  //   const newPatientName = params.get('patientName');
  //   const newFeedbackRating = params.get('feedbackRating')
  //     ? parseInt(params.get('feedbackRating') as string, 10)
  //     : undefined;
  //   const newPage = parseInt(params.get('page') || '1', 10);
  //   const newLimit = parseInt(params.get('limit') || '25', 10);

  //   setFilters((prev) => ({
  //     ...prev,
  //     startDate: newStartDate || prev.startDate,
  //     endDate: newEndDate || prev.endDate,
  //     clinicId: newClinicId || prev.clinicId,
  //     timePeriod: newTimePeriod || prev.timePeriod,
  //     doctorId: newDoctorId || prev.doctorId,
  //     patientName: newPatientName || prev.patientName,
  //     feedbackRating:
  //       newFeedbackRating !== undefined
  //         ? newFeedbackRating
  //         : prev.feedbackRating,
  //     page: newPage || prev.page,
  //     limit: newLimit || prev.limit,
  //   }));
  // }, []);

  useEffect(() => {
    console.log('Updated filters:', filters);
  }, [filters]);

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <Typography variant="h4" gutterBottom>
          Google 評論列表
        </Typography>
        <ReviewListFilters onApply={handleApplyFilters} />
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'hidden',
          }}
        ></Box>
        <ReviewList {...filters} />
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ReviewListPage;
