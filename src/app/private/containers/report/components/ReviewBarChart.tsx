import { useEffect, useMemo, useState } from 'react';
import { Granularity } from '../../../../../types/Share';
import { getReviewCountAndRate } from '../../../../../services/ReviewService';
import useSWR from 'swr';
import { Box } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';
import CenterText from '../../../../../components/box/CenterText';
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

interface IReviewChartData {
  date: string;
  reviewCount: number;
  oneStarReviewCount: number;
  twoStarReviewCount: number;
  threeStarReviewCount: number;
  fourStarReviewCount: number;
  fiveStarReviewCount: number;
}

interface IReviewProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  granularity?: Granularity;
}

const ReviewLineChart: React.FC<IReviewProps> = ({
  startDate,
  endDate,
  clinicId,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IReviewChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (clinicId) params.set('clinicId', clinicId);
    if (granularity) params.set('granularity', granularity);
    params.set('startDate', startDate);
    params.set('endDate', endDate);

    return params.toString();
  }, [startDate, endDate, clinicId, granularity]);

  const { data, error } = useSWR(`getReviewCountAndRate?${queryString}`, () =>
    getReviewCountAndRate({ queryString }),
  );

  useEffect(() => {
    setMessage(null);
    setLoading(true);

    if (data) {
      if (data.data.length === 0) {
        setMessage('選擇區間沒有門診資料');
        setLoading(false);
        setChartData([]);
      } else {
        setChartData(data.data);
        setLoading(false);
      }
    }

    const allChartData = chartData.map((item) =>
      Object.values(item).reduce((acc, cur) => acc + cur, 0),
    );
    const maxCount = Math.max(...allChartData) + 5;
    const minCount = Math.min(...allChartData);

    setYAxisDomain([minCount, maxCount + 10]);
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
      <BarChart data={chartData} margin={{ top: 5, left: 20, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={yAxisDomain}
          label={{
            value: '數量',
            angle: -90,
            position: 'insideLeft',
            offset: -5,
          }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="oneStarReviewCount"
          name="一星評論"
          stackId="a"
          fill="#2A265F"
        />
        <Bar
          dataKey="twoStarReviewCount"
          name="兩星評論"
          stackId="a"
          fill="#3C3D99"
        />
        <Bar
          dataKey="threeStarReviewCount"
          name="三星評論"
          stackId="a"
          fill="#5752D1"
        />
        <Bar
          dataKey="fourStarReviewCount"
          name="四星評論"
          stackId="a"
          fill="#8481DD"
        />
        <Bar
          dataKey="fiveStarReviewCount"
          name="五星評論"
          stackId="a"
          fill="#B2B0EA"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReviewLineChart;
