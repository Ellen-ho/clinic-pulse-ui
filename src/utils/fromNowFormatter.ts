import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const fromNowFormatter = (date: string) => {
  return dayjs().from(dayjs(date), true);
};
