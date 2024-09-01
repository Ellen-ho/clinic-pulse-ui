import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs, { Dayjs } from 'dayjs';

interface IBasicDateRangePickerProps {
  setDateRange: ({ from, to }: { from: string; to: string }) => void;
  initStart: Dayjs;
  initEnd: Dayjs;
}
export default function BasicDateRangePicker({
  setDateRange,
  initStart,
  initEnd,
}: IBasicDateRangePickerProps) {
  return (
    <DateRangePicker
      disableFuture={true}
      displayWeekNumber={true}
      minDate={dayjs('2022-01-01')}
      sx={{ width: '100%' }}
      // slots={{ field: SingleInputDateRangeField }}
      defaultValue={[initStart, initEnd]}
      onChange={(newValue) => {
        const from = newValue[0]?.format('YYYY-MM-DD') ?? '';
        const to = newValue[1]?.format('YYYY-MM-DD') ?? '';
        setDateRange({ from, to });
      }}
      localeText={{ start: '起始時間', end: '結束時間' }}
    />
  );
}
