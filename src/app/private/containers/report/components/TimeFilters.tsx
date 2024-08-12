import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Granularity } from '../../../../../types/Share';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface ITimeSelectionProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    granularity: Granularity;
  }) => void;
  initialYear: string;
  initialMonth: string;
  initialWeek: string;
}

const TimeFilters: React.FC<ITimeSelectionProps> = ({
  onApply,
  initialYear,
  initialMonth,
  initialWeek,
}) => {
  const [value, setValue] = useState<string | null>('week');
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedWeek, setSelectedWeek] = useState(initialWeek);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  const currentWeek = dayjs().isoWeek();

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
        setSelectedWeek('1');
      } else if (newValue === 'week') {
        setSelectedYear(initialYear);
        setSelectedMonth(initialMonth);
        setSelectedWeek(initialWeek);
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
    });
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(handleApply, 400);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [value, selectedYear, selectedMonth, selectedWeek]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={12}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
          <ToggleButton value="year">年</ToggleButton>
          <ToggleButton value="month">月</ToggleButton>
          <ToggleButton value="week">週</ToggleButton>
        </ToggleButtonGroup>
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
    </Grid>
  );
};

export default TimeFilters;
