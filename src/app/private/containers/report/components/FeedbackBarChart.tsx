import { useEffect, useMemo, useState } from 'react';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';
import { getFeedbackCountAndRate } from '../../../../../services/FeedbackService';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CenterText from '../../../../../components/box/CenterText';
import { Box } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';

interface IFeedbackChartData {
  date: string;
  feedbackCount: number;
  oneStarFeedbackCount: number;
  twoStarFeedbackCount: number;
  threeStarFeedbackCount: number;
  fourStarFeedbackCount: number;
  fiveStarFeedbackCount: number;
  oneStarFeedbackRate: number;
  twoStarFeedbackRate: number;
  threeStarFeedbackRate: number;
  fourStarFeedbackRate: number;
  fiveStarFeedbackRate: number;
}

interface IFeedbackProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  granularity?: Granularity;
}

const FeedbackBarChart: React.FC<IFeedbackProps> = ({
  startDate,
  endDate,
  clinicId,
  timePeriod,
  doctorId,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IFeedbackChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (clinicId) params.set('clinicId', clinicId);
    if (timePeriod) params.set('timePeriod', timePeriod);
    if (doctorId) params.set('doctorId', doctorId);
    if (granularity) params.set('granularity', granularity);
    params.set('startDate', startDate);
    params.set('endDate', endDate);

    return params.toString();
  }, [startDate, endDate, clinicId, timePeriod, doctorId, granularity]);

  const { data, error } = useSWR(`getFeedbackCountAndRate?${queryString}`, () =>
    getFeedbackCountAndRate({ queryString }),
  );

  useEffect(() => {
    setMessage(null);
    setLoading(true);

    if (data) {
      if (data.data.length === 0) {
        setMessage('選擇區間沒有反饋資料');
        setLoading(false);
        setChartData([]);
      } else {
        setChartData(data.data);
        setLoading(false);
      }
      const maxCount = Math.max(...data.data.map((item) => item.feedbackCount));
      const minCount = Math.min(...data.data.map((item) => item.feedbackCount));

      setYAxisDomain([minCount, maxCount + 5]);
    }
  }, [data]);

  if (loading)
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <DataLoading />
      </Box>
    );
  if (error)
    return (
      <CenterText>
        <>{'Error loading data'}</>
      </CenterText>
    );
  if (message)
    return (
      <CenterText>
        <>{message}</>
      </CenterText>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="oneStarFeedbackCount" stackId="a" fill="#8884d8" />
        <Bar dataKey="twoStarFeedbackCount" stackId="a" fill="#82ca9d" />
        <Bar dataKey="threeStarFeedbackCount" stackId="a" fill="#ffc658" />
        <Bar dataKey="fourStarFeedbackCount" stackId="a" fill="#ff7f50" />
        <Bar dataKey="fiveStarFeedbackCount" stackId="a" fill="#6a0dad" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FeedbackBarChart;
