import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormatter = (
  date: string,
  format: string = 'MMM D, YYYY h:mm A',
) => {
  if (!date) return 'No date provided';
  return dayjs(date).tz('Asia/Taipei').format(format);
};
