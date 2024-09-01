import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import { getDoctorsFromCache } from '../../../../../utils/getDoctorsFromCache';
import { IDoctors } from '../../../../../types/Doctors';
import {
  FiltersContext,
  useFiltersContext,
} from '../../../../../context/FiltersContext';
import { IClinics } from '../../../../../types/Clinics';
import { getClinicsFromCache } from '../../../../../utils/getClinicsFromCache';
import { AuthContext } from '../../../../../context/AuthContext';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface ITimeSelectionProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    granularity: Granularity;
    clinicId?: string;
    timePeriod?: string;
    doctorId?: string;
  }) => void;
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

const TimeFilters: React.FC<ITimeSelectionProps> = ({ onApply }) => {
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  const currentWeek = dayjs().isoWeek();
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { doctors: contextDoctors, clinics: contextClinics } =
    useContext(FiltersContext) || {};
  const [doctors, setDoctors] = useState<IDoctors[]>([]);
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [value, setValue] = useState<string | null>('week');
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonth.toString().padStart(2, '0'),
  );
  const [selectedWeek, setSelectedWeek] = useState(currentWeek.toString());
  const [timePeriod, setTimePeriod] = useState<string | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<string | undefined>(
    state.doctorId || undefined,
  );
  const [clinicId, setClinicId] = useState<string | undefined>(undefined);

  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => 2022 + i,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const getWeeksInMonth = (year: string, month: string) => {
    const startOfMonth = dayjs(`${year}-${month}-01`);
    const endOfMonth = startOfMonth.endOf('month');
    const weeks = new Set<number>();

    let currentWeekStart = startOfMonth.startOf('isoWeek');
    while (currentWeekStart.isBefore(endOfMonth)) {
      weeks.add(currentWeekStart.isoWeek());
      currentWeekStart = currentWeekStart.add(1, 'week');
    }
    return Array.from(weeks);
  };

  const weeks = getWeeksInMonth(selectedYear, selectedMonth);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {
      setValue(newValue);
      if (newValue === 'year') {
        setSelectedMonth('1');
        setSelectedWeek('1');
      } else if (newValue === 'month') {
        setSelectedMonth(currentMonth.toString().padStart(2, '0'));
        setSelectedWeek('1');
      } else if (newValue === 'week') {
        setSelectedYear(currentYear.toString());
        setSelectedMonth(currentMonth.toString().padStart(2, '0'));
        setSelectedWeek(currentWeek.toString());
      }
    }
  };

  const handleApply = () => {
    let startDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
    let endDate = dayjs().format('YYYY-MM-DD');
    let granularity: Granularity = Granularity.DAY;

    switch (value) {
      case 'year':
        granularity = Granularity.MONTH;
        startDate = `${selectedYear}-01-01`;
        endDate =
          selectedYear === currentYear.toString()
            ? dayjs().format('YYYY-MM-DD')
            : `${selectedYear}-12-31`;
        break;
      case 'month':
        granularity = Granularity.WEEK;
        startDate = `${selectedYear}-${selectedMonth
          .toString()
          .padStart(2, '0')}-01`;
        endDate =
          selectedYear === currentYear.toString() &&
          parseInt(selectedMonth) === currentMonth
            ? dayjs().format('YYYY-MM-DD')
            : dayjs(
                `${selectedYear}-${selectedMonth
                  .toString()
                  .padStart(2, '0')}-01`,
              )
                .endOf('month')
                .format('YYYY-MM-DD');
        break;
      case 'week':
        granularity = Granularity.DAY;
        startDate = dayjs()
          .year(parseInt(selectedYear))
          .isoWeek(parseInt(selectedWeek))
          .startOf('isoWeek')
          .format('YYYY-MM-DD');
        endDate =
          selectedYear === currentYear.toString() &&
          parseInt(selectedWeek) === currentWeek
            ? dayjs().format('YYYY-MM-DD')
            : dayjs()
                .year(parseInt(selectedYear))
                .isoWeek(parseInt(selectedWeek))
                .endOf('isoWeek')
                .format('YYYY-MM-DD');
        break;
      default:
        break;
    }

    onApply({
      startDate,
      endDate,
      granularity,
      clinicId,
      timePeriod,
      doctorId,
    });
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(handleApply, 400);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [
    value,
    selectedYear,
    selectedMonth,
    selectedWeek,
    clinicId,
    timePeriod,
    doctorId,
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
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div>
          <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
            <ToggleButton value="year">年</ToggleButton>
            <ToggleButton value="month">月</ToggleButton>
            <ToggleButton value="week">週</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <FormControl
          fullWidth
          margin="normal"
          style={{
            width: '120px',
          }}
        >
          <InputLabel id="year-select-label">年份</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="年份"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(value === 'month' || value === 'week') && (
          <FormControl
            fullWidth
            margin="normal"
            style={{
              width: '120px',
            }}
          >
            <InputLabel id="month-select-label">月份</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              label="月份"
            >
              {months.map((month) => (
                <MenuItem key={month} value={month.toString().padStart(2, '0')}>
                  {month}月
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {value === 'week' && selectedMonth && (
          <FormControl
            fullWidth
            margin="normal"
            style={{
              width: '250px',
            }}
          >
            <InputLabel id="week-select-label">週</InputLabel>
            <Select
              labelId="week-select-label"
              id="week-select"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              label="週"
            >
              {weeks.map((week, index) => (
                <MenuItem key={index} value={week}>
                  第{index + 1}週 (
                  {dayjs()
                    .year(parseInt(selectedYear))
                    .isoWeek(week)
                    .startOf('isoWeek')
                    .format('MM-DD')}{' '}
                  -{' '}
                  {dayjs()
                    .year(parseInt(selectedYear))
                    .isoWeek(week)
                    .endOf('isoWeek')
                    .format('MM-DD')}
                  )
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={12} sm={2}>
        <Autocomplete
          options={clinics}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="院區" />}
          onChange={(event, value) => setClinicId(value ? value.id : undefined)}
          value={clinics.find((clinic) => clinic.id === clinicId) || null}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Autocomplete
          options={timePeriodOptions}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="時段" />}
          onChange={(event, value) => setTimePeriod(value?.value || undefined)}
          value={
            timePeriodOptions.find((option) => option.value === timePeriod) ||
            null
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
    </Grid>
  );
};

export default TimeFilters;
