import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Autocomplete,
  Rating,
  Box,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import dayjs from 'dayjs';
import { TimePeriodType } from '../../../../../types/Share';

interface IFeedbackListFiltersProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    clinicId?: string;
    timePeriod?: TimePeriodType;
    doctorId?: string;
    patientId?: string;
    feedbackRating?: number;
  }) => void;
}

const doctors = [
  { label: 'ann', id: '008ce240-3f25-4e2a-a3e2-d62f5e20fe71' },
  { label: '111', id: 'c2d88a24-ffa8-4083-bd04-2f2715f244e3' },
  { label: '張月嵐', id: '3' },
  { label: '黃千華', id: '4' },
  { label: '李嘉芳', id: '5' },
];
const patients = [
  { label: '林黃月', id: '1' },
  { label: '趙偉健', id: '2' },
];
const clinics = [
  { label: '台北院區', id: '1' },
  { label: '台中院區', id: '16458ab0-4bb6-4141-9bf0-6d7398942d9b' },
  { label: '高雄院區', id: '3' },
];
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

const feedbackRatings = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];

const defaultClinicId = '16458ab0-4bb6-4141-9bf0-6d7398942d9b';

const FeedbackListFilters: React.FC<IFeedbackListFiltersProps> = ({
  onApply,
}) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    dayjs().startOf('month'),
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(
    dayjs().endOf('month'),
  );
  const [clinicId, setClinicId] = useState<string | undefined>(defaultClinicId);
  const [timePeriod, setTimePeriod] = useState<TimePeriodType | undefined>(
    undefined,
  );
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
  const [patientId, setPatientId] = useState<string | undefined>(undefined);

  const handleApplyFilters = () => {
    onApply({
      startDate: startDate?.format('YYYY-MM-DD') || '',
      endDate: endDate?.format('YYYY-MM-DD') || '',
      clinicId,
      timePeriod,
      doctorId,
      patientId,
      feedbackRating: rating,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date Picker"
            format="YYYY/MM/DD"
            defaultValue={dayjs().startOf('month')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date Picker"
            format="YYYY/MM/DD"
            defaultValue={dayjs().endOf('month')}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={clinics}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Clinic" />}
            onChange={(event, value) =>
              setClinicId(value ? value.id : undefined)
            }
            value={clinics.find((clinic) => clinic.id === clinicId) || null}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={timePeriodOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Time Period" />
            )}
            onChange={(event, value) =>
              setTimePeriod(value?.value || undefined)
            }
            value={
              timePeriodOptions.find((option) => option.value === timePeriod) ||
              null
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={feedbackRatings}
            getOptionLabel={(option) => `${option.value} 星`}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box component="li" key={key} {...otherProps}>
                  <Rating value={option.value} readOnly />
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Feedback Rating" />
            )}
            onChange={(event, newValue) => setRating(newValue?.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Doctor" />}
            onChange={(event, value) =>
              setDoctorId(value ? value.id : undefined)
            }
            value={doctors.find((doctor) => doctor.id === doctorId) || null}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={patients}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Patient" />}
            onChange={(event, value) =>
              setPatientId(value ? value.id : undefined)
            }
            value={patients.find((patient) => patient.id === patientId) || null}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default FeedbackListFilters;
