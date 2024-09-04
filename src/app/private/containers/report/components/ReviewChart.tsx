import { useEffect, useMemo, useState } from 'react';
import { Granularity } from '../../../../../types/Share';
import { Box, Typography } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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
  oneStarReviewRate: number;
  twoStarReviewRate: number;
  threeStarReviewRate: number;
  fourStarReviewRate: number;
  fiveStarReviewRate: number;
}

interface IReviewProps {
  data: IReviewChartData[];
  granularity?: Granularity;
}

const ReviewChart: React.FC<IReviewProps> = ({ data, granularity }) => {
  const [chartData, setChartData] = useState<IReviewChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [yAxisDomainLeft, setYAxisDomainLeft] = useState<[number, number]>([
    0, 0,
  ]);
  const [yAxisDomainRight, setYAxisDomainRight] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    setMessage(null);
    setLoading(true);
    if (data) {
      if (data.length === 0) {
        setMessage('選擇區間沒有反饋資料');
        setLoading(false);
        setChartData([]);
      } else {
        setChartData(data);
        setLoading(false);
      }
      const maxCountLeft = Math.max(
        ...data.map((item) =>
          Math.max(
            item.oneStarReviewCount,
            item.twoStarReviewCount,
            item.threeStarReviewCount,
            item.fourStarReviewCount,
            item.fiveStarReviewCount,
          ),
        ),
      );
      const maxCountRight = Math.min(
        100,
        Math.ceil(
          Math.max(
            ...data.map((item) =>
              Math.max(
                item.oneStarReviewRate,
                item.threeStarReviewRate,
                item.threeStarReviewRate,
                item.fourStarReviewRate,
                item.fiveStarReviewRate,
              ),
            ),
          ),
        ),
      );

      setYAxisDomainLeft([0, maxCountLeft + 5]);
      setYAxisDomainRight([0, maxCountRight]);
    }
  }, [data]);
  if (loading)
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <DataLoading />
      </Box>
    );

  if (message)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography>{message}</Typography>
      </Box>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis
          domain={yAxisDomainLeft}
          label={{
            value: '數量',
            angle: -90,
            position: 'insideLeft',
            offset: -5,
          }}
          yAxisId="left"
          orientation="left"
          stroke="#8884d8"
        />
        <YAxis
          domain={yAxisDomainRight}
          label={{
            value: '百分率',
            angle: -90,
            position: 'insideRight',
            offset: -5,
          }}
          yAxisId="right"
          orientation="right"
          stroke="#82ca9d"
        />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="oneStarReviewCount"
          name="一星評論人數"
          barSize={20}
          fill="#413ea0"
        />
        <Bar
          yAxisId="left"
          dataKey="twoStarReviewCount"
          name="二星評論人數"
          barSize={20}
          fill="#009596"
        />
        <Bar
          yAxisId="left"
          dataKey="threeStarReviewCount"
          name="三星評論人數"
          barSize={20}
          fill="#e28743"
        />
        <Bar
          yAxisId="left"
          dataKey="fourStarReviewCount"
          name="四星評論人數"
          barSize={20}
          fill="#ff7f50"
        />
        <Bar
          yAxisId="left"
          dataKey="fiveStarReviewCount"
          name="五星評論人數"
          barSize={20}
          fill="#6a0dad"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="oneStarReviewRate"
          name="一星評論比率"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="twoStarReviewRate"
          name="二星評論比率"
          stroke="#82ca9d"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="threeStarReviewRate"
          name="三星評論比率"
          stroke="#ffc658"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="fourStarReviewRate"
          name="四星評論比率"
          stroke="#ff00ff"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="fiveStarReviewRate"
          name="五星評論比率"
          stroke="#00ffff"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ReviewChart;
