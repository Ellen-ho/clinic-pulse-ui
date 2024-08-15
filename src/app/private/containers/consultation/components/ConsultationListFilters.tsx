import React, { useEffect, useState } from 'react';
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

const doctors = [
  { label: 'ann', id: '008ce240-3f25-4e2a-a3e2-d62f5e20fe71' },
  { label: '111', id: 'c2d88a24-ffa8-4083-bd04-2f2715f244e3' },
  { label: '張俊傑', id: '0b0067a4-b7cd-4798-a75c-453f6a780440' },
  { label: '林俊宏', id: '266ff4c0-87a8-4445-b56c-72a72c5d9f58' },
  { label: '李美玲', id: 'b0f4439b-314f-4495-b928-18fa9dbfa6d5' },
  { label: '林怡芬', id: 'bb8f4d80-b457-4d6f-8bfa-1f0d5e55143c' },
  { label: '鍾婉儀', id: 'f45714bc-e519-4753-a638-be15bc2aab93' },
  { label: '陳志明', id: 'fee86a36-6260-4252-afe8-7820c069589f' },
];

const clinics = [
  { label: '台北院區', id: '690d0ea3-9f8d-4143-b160-0661a003bf08' },
  { label: '台中院區', id: '16458ab0-4bb6-4141-9bf0-6d7398942d9b' },
  { label: '高雄院區', id: 'bf51c88e-9587-479e-994a-d15ec484c333' },
];

const timePeriodMappings = {
  早診: 'MORNING_SESSION',
  午診: 'AFTERNOON_SESSION',
  晚診: 'EVENING_SESSION',
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

const defaultClinicId = '16458ab0-4bb6-4141-9bf0-6d7398942d9b';

const ConsultationListFilters: React.FC<IConsultationListFiltersProps> = ({
  onApply,
}) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('month'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    dayjs().endOf('month'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(defaultClinicId);
  const [timePeriod, setTimePeriod] = useState<string | undefined>(undefined);
  const [totalDurationMin, setTotalDurationMin] = useState<number | undefined>(
    undefined,
  );
  const [totalDurationMax, setTotalDurationMax] = useState<number | undefined>(
    undefined,
  );
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
  const [patientName, setPatientName] = useState('');
  const [options, setOptions] = useState<IPatientOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const fetchPatients = async (searchText: string) => {
    if (!searchText.trim()) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const result = await getPatientNameAutoComplete({
        query: { searchText },
      });
      setOptions(result.patients);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      setOptions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isComposing && patientName) {
      fetchPatients(patientName);
    }
  }, [patientName, isComposing]);

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
    options,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
          <DatePicker
            label="起始時間"
            format="YYYY/MM/DD"
            defaultValue={dayjs().startOf('month')}
            onChange={(newValue) => {
              setStartDate(newValue ? dayjs(newValue) : null);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <DatePicker
            label="終止時間"
            format="YYYY/MM/DD"
            defaultValue={dayjs().endOf('month')}
            onChange={(newValue) => {
              setEndDate(newValue ? dayjs(newValue) : null);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={clinics}
            getOptionLabel={(option) => option.label}
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
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="醫師" />}
            onChange={(event, value) =>
              setDoctorId(value ? value.id : undefined)
            }
            value={doctors.find((doctor) => doctor.id === doctorId) || null}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            freeSolo
            loading={loading}
            options={options}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : option.fullName
            }
            inputValue={patientName}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === 'input') setPatientName(newInputValue);
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setPatientName(newValue);
              } else if ((newValue as any).inputValue) {
                setPatientName((newValue as any).inputValue);
              } else {
                setPatientName(newValue ? newValue.fullName : '');
              }
            }}
            filterOptions={(x) => x}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Patient"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default ConsultationListFilters;
