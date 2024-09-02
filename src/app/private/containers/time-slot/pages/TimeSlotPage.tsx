import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { Box, Typography } from '@mui/material';
import TimeSlotFilters from '../components/TimeSlotFilters';
import TimeSlotCalendar from '../components/TimeSlotCalendar';

interface FilterValues {
  clinicId?: string;
}

const TimeSlotPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [filters, setFilters] = useState<FilterValues>({
    clinicId: '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
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
          門診表
        </Typography>
        <TimeSlotFilters onApply={handleApplyFilters} />
        <TimeSlotCalendar clinicId={filters.clinicId} />
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default TimeSlotPage;
