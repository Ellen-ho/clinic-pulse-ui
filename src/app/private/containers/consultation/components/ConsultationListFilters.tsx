import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import PatientAutocomplete from '../../../../../components/PatientAutocomplete/PatientAutocomplete';
import { TimePeriodType } from '../../../../../types/Share';
import { FiltersContext } from '../../../../../context/FiltersContext';
import { IDoctors } from '../../../../../types/Doctors';
import { IClinics } from '../../../../../types/Clinics';
import { getDoctorsFromCache } from '../../../../../utils/getDoctorsFromCache';
import { getClinicsFromCache } from '../../../../../utils/getClinicsFromCache';
import { AuthContext } from '../../../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilterValues } from '../pages/ConsultationListPage';

interface IConsultationListFiltersProps {
  onApply: (filters: FilterValues) => void;
  initFilters: FilterValues;
}

interface IPatientOption {
  id: string;
  fullName: string;
}

const timePeriodMappings = {
  早診: TimePeriodType.MORNING_SESSION,
  午診: TimePeriodType.AFTERNOON_SESSION,
  晚診: TimePeriodType.EVENING_SESSION,
};

const timePeriodOptions = [
  { label: '早診', value: timePeriodMappings['早診'] },
  { label: '午診', value: timePeriodMappings['午診'] },
  { label: '晚診', value: timePeriodMappings['晚診'] },
];

const durationOptions = [
  { label: '15 分鐘', value: 15 },
  { label: '30 分鐘', value: 30 },
  { label: '45 分鐘', value: 45 },
  { label: '60 分鐘', value: 60 },
];

const ConsultationListFilters: React.FC<IConsultationListFiltersProps> = ({
  onApply,
  initFilters,
}) => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { doctors: contextDoctors, clinics: contextClinics } =
    useContext(FiltersContext) || {};
  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [startDate, setStartDate] = useState<string | null>(
    initFilters.startDate ?? dayjs().startOf('isoWeek'),
  );
  const [endDate, setEndDate] = useState<string | null>(
    initFilters.endDate ?? dayjs().endOf('isoWeek'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(
    initFilters.clinicId,
  );
  const [timePeriod, setTimePeriod] = useState<string | undefined>(
    initFilters.timePeriod,
  );
  const [totalDurationMin, setTotalDurationMin] = useState<number | undefined>(
    initFilters.totalDurationMin,
  );
  const [totalDurationMax, setTotalDurationMax] = useState<number | undefined>(
    initFilters.totalDurationMax,
  );
  const [doctorId, setDoctorId] = useState<string | undefined>(
    initFilters.doctorId ?? state.doctorId ?? '',
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
    const filters = {
      startDate: dayjs(startDate).format('YYYY-MM-DD') || '',
      endDate: dayjs(endDate).format('YYYY-MM-DD') || '',
      clinicId,
      timePeriod,
      totalDurationMin,
      totalDurationMax,
      patientName: patientName?.trim() ? patientName : undefined,
      doctorId,
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
  }, [
    startDate,
    endDate,
    clinicId,
    timePeriod,
    totalDurationMin,
    totalDurationMax,
    doctorId,
    patientName,
  ]);

  useEffect(() => {
    const cachedDoctors = getDoctorsFromCache();
    const cachedClinics = getClinicsFromCache();

    if (
      cachedDoctors &&
      Array.isArray(cachedDoctors) &&
      cachedDoctors.length > 0
    ) {
      setDoctors(cachedDoctors);
    } else if (contextDoctors && contextDoctors.length > 0) {
      setDoctors(contextDoctors);
      localStorage.setItem('doctors', JSON.stringify(contextDoctors));
    }

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
  }, [contextDoctors, contextClinics]);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const initialStartDate = params.get('startDate');
  //   const initialEndDate = params.get('endDate');
  //   const initialClinicId = params.get('clinicId');
  //   const initialTimePeriod = params.get('timePeriod');
  //   const initialTotalDurationMin = params.get('totalDurationMin');
  //   const initialTotalDurationMax = params.get('totalDurationMax');
  //   const initialDoctorId = params.get('doctorId');
  //   const initialPatientName = params.get('patientName');

  //   if (initialStartDate) setStartDate(dayjs(initialStartDate));
  //   if (initialEndDate) setEndDate(dayjs(initialEndDate));
  //   if (initialClinicId) setClinicId(initialClinicId);
  //   if (initialTimePeriod) setTimePeriod(initialTimePeriod);
  //   if (initialTotalDurationMin)
  //     setTotalDurationMin(parseInt(initialTotalDurationMin));
  //   if (initialTotalDurationMax)
  //     setTotalDurationMax(parseInt(initialTotalDurationMax));
  //   if (initialDoctorId) setDoctorId(initialDoctorId);
  //   if (initialPatientName) setPatientName(initialPatientName);
  // }, [location.search]);

  const filteredDurationOptionsForMax = useMemo(() => {
    return durationOptions.filter(
      (option) =>
        totalDurationMin === undefined || option.value > totalDurationMin,
    );
  }, [totalDurationMin]);

  const filteredDurationOptionsForMin = useMemo(() => {
    return durationOptions.filter(
      (option) =>
        totalDurationMax === undefined || option.value < totalDurationMax,
    );
  }, [totalDurationMax]);

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
              setStartDate(
                newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
              );
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
              setEndDate(
                newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
              );
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
            options={timePeriodOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="時段" />}
            onChange={(event, value) =>
              setTimePeriod(value?.value || undefined)
            }
            value={
              timePeriodOptions.find((option) => option.value === timePeriod) ||
              null
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={filteredDurationOptionsForMin}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="最小總時長" variant="outlined" />
            )}
            onChange={(event, value) =>
              setTotalDurationMin(value ? value.value : undefined)
            }
            value={
              filteredDurationOptionsForMin.find(
                (option) => option.value === totalDurationMin,
              ) || null
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={filteredDurationOptionsForMax}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="最大總時長" variant="outlined" />
            )}
            onChange={(event, value) =>
              setTotalDurationMax(value ? value.value : undefined)
            }
            value={
              filteredDurationOptionsForMax.find(
                (option) => option.value === totalDurationMax,
              ) || null
            }
          />
        </Grid>
        {!isDoctor && (
          <Grid item xs={12} sm={2}>
            <Autocomplete
              options={doctors}
              getOptionLabel={(option) => option.fullName}
              renderInput={(params) => <TextField {...params} label="醫師" />}
              onChange={(event, value) =>
                setDoctorId(value ? value.id : undefined)
              }
              value={doctors.find((doctor) => doctor.id === doctorId) || null}
            />
          </Grid>
        )}
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

export default ConsultationListFilters;
