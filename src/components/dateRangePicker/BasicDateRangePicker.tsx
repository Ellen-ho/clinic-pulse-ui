import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

interface IBasicDateRangePickerProps {
  setDateRange: ({ from, to }: { from: string; to: string }) => void;
}
export default function BasicDateRangePicker({
  setDateRange,
}: IBasicDateRangePickerProps) {
  return (
    <DateRangePicker
      sx={{ width: '100%' }}
      slots={{ field: SingleInputDateRangeField }}
      onChange={(newValue) => {
        const from = newValue[0]?.format('YYYY-MM-DD') ?? '';
        const to = newValue[1]?.format('YYYY-MM-DD') ?? '';
        setDateRange({ from, to });
      }}
      localeText={{ start: '起始時間', end: '結束時間' }}
    />
  );
}
