import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
  createFilterOptions,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import { getPatientNameAutoComplete } from '../../../../../services/PatientService';
import _ from 'lodash';
import PatientAutocomplete from '../../../../../components/PatientAutocomplete/PatientAutocomplete';
import { TimePeriodType } from '../../../../../types/Share';
import { FiltersContext } from '../../../../../context/FiltersContext';
import { IDoctors } from '../../../../../types/Doctors';
import { IClinics } from '../../../../../types/Clinics';
import { getDoctorsFromCache } from '../../../../../utils/getDoctorsFromCache';
import { getClinicsFromCache } from '../../../../../utils/getClinicsFromCache';

interface IConsultationListFiltersProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    clinicId?: string;
    timePeriod?: string;
    totalDurationMin?: number;
    totalDurationMax?: number;
    patientName?: string;
    doctorId?: string;
  }) => void;
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
}) => {
  const { doctors: contextDoctors, clinics: contextClinics } =
    useContext(FiltersContext) || {};
  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('isoWeek'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    dayjs().endOf('isoWeek'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(undefined);
  const [timePeriod, setTimePeriod] = useState<string | undefined>(undefined);
  const [totalDurationMin, setTotalDurationMin] = useState<number | undefined>(
    undefined,
  );
  const [totalDurationMax, setTotalDurationMax] = useState<number | undefined>(
    undefined,
  );
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
  const [patientName, setPatientName] = useState('');

  const handleApplyFilters = () => {
    onApply({
      startDate: startDate?.format('YYYY-MM-DD') || '',
      endDate: endDate?.format('YYYY-MM-DD') || '',
      clinicId,
      timePeriod,
      totalDurationMin,
      totalDurationMax,
      patientName: patientName.trim() ? patientName : undefined,
      doctorId,
    });
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <DatePicker
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
            options={durationOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="最小總時長" variant="outlined" />
            )}
            onChange={(event, value) =>
              setTotalDurationMin(value ? value.value : undefined)
            }
            value={
              durationOptions.find(
                (option) => option.value === totalDurationMin,
              ) || null
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={durationOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="最大總時長" variant="outlined" />
            )}
            onChange={(event, value) =>
              setTotalDurationMax(value ? value.value : undefined)
            }
            value={
              durationOptions.find(
                (option) => option.value === totalDurationMax,
              ) || null
            }
          />
        </Grid>
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

export default ConsultationListFilters;
