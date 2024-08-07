import dayjs from 'dayjs';

export const getCurrentMonthDateRange = (date: Date) => {
  const targetDate = dayjs(date);
  let start = targetDate.startOf('month');
  let end = targetDate.endOf('month');

  const currentStartDate = start.format('YYYY-MM-DD');
  const currentEndDate = end.format('YYYY-MM-DD');

  return {
    currentStartDate,
    currentEndDate,
  };
};
