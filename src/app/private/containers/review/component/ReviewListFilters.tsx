import React, { useContext, useEffect, useState } from 'react';
import { Grid, TextField, Autocomplete, Rating, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import _ from 'lodash';
import dayjs from 'dayjs';
import { TimePeriodType } from '../../../../../types/Share';
import PatientAutocomplete from '../../../../../components/PatientAutocomplete/PatientAutocomplete';
import { FiltersContext } from '../../../../../context/FiltersContext';
import { IClinics } from '../../../../../types/Clinics';
import { getClinicsFromCache } from '../../../../../utils/getClinicsFromCache';
import { AuthContext } from '../../../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicDateRangePicker from '../../../../../components/dateRangePicker/BasicDateRangePicker';
import { ReviewFilterValues } from '../pages/ReviewListPage';

interface IReviewListFiltersProps {
  onApply: (filters: ReviewFilterValues) => void;
  initFilters: ReviewFilterValues;
}

const reviewRatings = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

const ReviewListFilters: React.FC<IReviewListFiltersProps> = ({
  onApply,
  initFilters,
}) => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { clinics: contextClinics } = useContext(FiltersContext) || {};
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [startDate, setStartDate] = useState<string>(
    initFilters.startDate ?? dayjs().startOf('isoWeek').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(
    initFilters.endDate ?? dayjs().format('YYYY-MM-DD'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(
    initFilters.clinicId,
  );
  const [reviewRating, setReviewRating] = useState<number | undefined>(
    initFilters.reviewRating,
  );
  const [patientName, setPatientName] = useState<string | undefined>(
    initFilters.patientName,
  );
  const navigate = useNavigate();
  const location = useLocation();

  const updateQueryParams = (filters: Record<string, any>) => {
    const params = new URLSearchParams(location.search);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleApplyFilters = () => {
    if (!startDate || !endDate) return;

    const filters = {
      startDate: startDate,
      endDate: endDate,
      clinicId,
      patientName: patientName?.trim() ? patientName : undefined,
      reviewRating,
    };

    onApply(filters);
    updateQueryParams(filters);
  };

  const handleStartAndEndDate = ({
    from,
    to,
  }: {
    from: string;
    to: string;
  }) => {
    setStartDate(from);
    setEndDate(to);
    const filters = {
      startDate: from,
      endDate: to,
      clinicId,
      patientName: patientName?.trim() ? patientName : undefined,
      reviewRating,
    };

    onApply(filters);
    updateQueryParams(filters);
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(handleApplyFilters, 400);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [startDate, endDate, clinicId, patientName, reviewRating]);

  useEffect(() => {
    const cachedClinics = getClinicsFromCache();

    if (
      cachedClinics &&
      Array.isArray(cachedClinics) &&
      cachedClinics.length > 0
    ) {
      setClinics(cachedClinics);
    } else if (contextClinics && contextClinics.length > 0) {
      setClinics(contextClinics);
      localStorage.setItem('clinics', JSON.stringify(contextClinics));
    }
  }, [contextClinics]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={4}>
          <BasicDateRangePicker
            setDateRange={handleStartAndEndDate}
            initStart={dayjs(startDate)}
            initEnd={dayjs(endDate)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={clinics}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="院區" />}
            onChange={(event, value) =>
              setClinicId(value ? value.id : undefined)
            }
            value={clinics.find((clinic) => clinic.id === clinicId) || null}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={reviewRatings}
            getOptionLabel={(option) => `${option.value} 星`}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box component="li" key={key} {...otherProps}>
                  <Rating value={option.value} readOnly />
                </Box>
              );
            }}
            renderInput={(params) => <TextField {...params} label="評論星級" />}
            onChange={(event, newValue) => setReviewRating(newValue?.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <PatientAutocomplete
            value={patientName || ''}
            onChange={(newValue) => setPatientName(newValue)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default ReviewListFilters;
