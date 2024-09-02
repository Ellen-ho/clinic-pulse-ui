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

interface IReviewListFiltersProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    clinicId?: string;
    timePeriod?: TimePeriodType;
    doctorId?: string;
    patientName?: string;
    feedbackRating?: number;
  }) => void;
}

const reviewRatings = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

const ReviewListFilters: React.FC<IReviewListFiltersProps> = ({ onApply }) => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { clinics: contextClinics } = useContext(FiltersContext) || {};
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('isoWeek'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    dayjs().endOf('isoWeek'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(undefined);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [patientName, setPatientName] = useState('');
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
    const filters = {
      startDate: startDate?.format('YYYY-MM-DD') || '',
      endDate: endDate?.format('YYYY-MM-DD') || '',
      clinicId,
      patientName: patientName.trim() ? patientName : undefined,
      reviewRating: rating,
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
  }, [startDate, endDate, clinicId, rating, patientName]);

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialStartDate = params.get('startDate');
    const initialEndDate = params.get('endDate');
    const initialClinicId = params.get('clinicId');
    const initialPatientName = params.get('patientName');
    const initialRating = params.get('reviewRating');

    if (initialStartDate) setStartDate(dayjs(initialStartDate));
    if (initialEndDate) setEndDate(dayjs(initialEndDate));
    if (initialClinicId) setClinicId(initialClinicId);
    if (initialPatientName) setPatientName(initialPatientName);
    if (initialRating) setRating(parseInt(initialRating, 10));
  }, [location.search]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <DatePicker
            sx={{ width: '100%' }}
            label="起始時間"
            format="YYYY/MM/DD"
            defaultValue={dayjs().startOf('isoWeek')}
            onChange={(newValue) => {
              setStartDate(newValue ? dayjs(newValue) : null);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <DatePicker
            sx={{ width: '100%' }}
            label="終止時間"
            format="YYYY/MM/DD"
            defaultValue={dayjs().endOf('isoWeek')}
            onChange={(newValue) => {
              setEndDate(newValue ? dayjs(newValue) : null);
            }}
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
            onChange={(event, newValue) => setRating(newValue?.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <PatientAutocomplete
            value={patientName}
            onChange={(newValue) => setPatientName(newValue)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default ReviewListFilters;
