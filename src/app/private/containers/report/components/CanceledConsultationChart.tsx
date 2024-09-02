import React, { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import useSWR from 'swr';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import CenterText from '../../../../../components/box/CenterText';
import { Box, Typography } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';
import { getConsultationOnsiteCanceledCountAndRate } from '../../../../../services/ConsultationService';

interface ICanceledChartData {
  date: string;
  onsiteCancelCount: number;
  consultationCount: number;
  onsiteCancelRate: number;
}

interface ICanceledConsultationChartProps {
  data: ICanceledChartData[];
  granularity?: Granularity;
}

const CanceledConsultationChart: React.FC<ICanceledConsultationChartProps> = ({
  data,
  granularity,
}) => {
  const [chartData, setChartData] = useState<ICanceledChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [yAxisDomainLeft, setYAxisDomainLeft] = useState<[number, number]>([
    0, 0,
  ]);
  const [yAxisDomainRight, setYAxisDomainRight] = useState<[number, number]>([
    0, 0,
  ]);

  // const queryString = useMemo(() => {
  //   const params = new URLSearchParams();

  //   if (clinicId) params.set('clinicId', clinicId);
  //   if (timePeriod) params.set('timePeriod', timePeriod);
  //   if (doctorId) params.set('doctorId', doctorId);
  //   if (granularity) params.set('granularity', granularity);
  //   params.set('startDate', startDate);
  //   params.set('endDate', endDate);

  //   return params.toString();
  // }, [startDate, endDate, clinicId, timePeriod, doctorId, granularity]);

  // const { data, error } = useSWR(
  //   `GetConsultationOnsiteCanceledCountAndRate?${queryString}`,
  //   () => getConsultationOnsiteCanceledCountAndRate({ queryString }),
  // );

  useEffect(() => {
    setMessage(null);
    setLoading(true);
    if (data) {
      if (data.length === 0) {
        setMessage('選擇區間沒有門診資料');
      } else {
        setChartData(data);

        const maxCountLeft = Math.max(
          ...data.map((item) =>
            Math.max(item.onsiteCancelCount, item.onsiteCancelCount),
          ),
        );
        const minCountLeft = 0;

        const maxCountRight = Math.max(
          ...data.map((item) =>
            Math.max(item.onsiteCancelRate, item.onsiteCancelRate),
          ),
        );
        const minCountRight = 0;

        setYAxisDomainLeft([minCountLeft, maxCountLeft + 5]);
        setYAxisDomainRight([minCountRight, maxCountRight + 5]);
      }
      setLoading(false);
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
            value: '人數',
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

        {/* <YAxis yAxisId="left" orientation="left" stroke="#8884d8" /> */}
        {/* <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" /> */}
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="onsiteCancelCount"
          name="退掛號人數"
          barSize={20}
          fill="#009596"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onsiteCancelRate"
          name="退掛號率"
          stroke="#82ca9d"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CanceledConsultationChart;
