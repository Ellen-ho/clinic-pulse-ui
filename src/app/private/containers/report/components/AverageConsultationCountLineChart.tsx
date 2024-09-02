import React, { useEffect, useMemo, useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';
import { getAverageConsultationCount } from '../../../../../services/ConsultationService';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';
import CenterText from '../../../../../components/box/CenterText';
import DataLoading from '../../../../../components/signs/DataLoading';
import { Box, Typography } from '@mui/material';

interface IAverageConsultationChartData {
  date: string;
  consultationCount: number;
  timeSlotCount: number;
  averageCount: number;
}

interface IAverageConsultationCountProps {
  data: IAverageConsultationChartData[];
  granularity: Granularity;
}

const AverageConsultationCountLineChart: React.FC<
  IAverageConsultationCountProps
> = ({ data, granularity }) => {
  const [chartData, setChartData] = useState<IAverageConsultationChartData[]>(
    [],
  );
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
  //   `GetAverageConsultationCount?${queryString}`,
  //   () => getAverageConsultationCount({ queryString }),
  // );

  // useEffect(() => {
  //   setMessage(null);
  //   setLoading(true);
  //   if (data) {
  //     if (data.totalConsultations === 0) {
  //       setMessage('選擇區間沒有門診資料');
  //     } else {
  //       setChartData(data.data);

  //       const maxCountLeft = Math.max(
  //         ...data.data.map((item) =>
  //           Math.max(item.consultationCount, item.consultationCount),
  //         ),
  //       );
  //       const minCountLeft = 0;

  //       const maxCountRight = Math.max(
  //         ...data.data.map((item) =>
  //           Math.max(item.averageCount, item.averageCount),
  //         ),
  //       );
  //       const minCountRight = 0;

  //       setYAxisDomainLeft([minCountLeft, maxCountLeft + 5]);
  //       setYAxisDomainRight([minCountRight, maxCountRight + 5]);
  //     }
  //     setLoading(false);
  //   }
  // }, [data]);
  useEffect(() => {
    setMessage(null);
    setLoading(true);

    if (data) {
      if (data.length === 0) {
        setMessage('選擇區間沒有門診資料');
        setChartData([]);
      } else {
        setChartData(data);

        const maxCountLeft = Math.max(
          ...data.map((item) => item.consultationCount),
        );
        const minCountLeft = 0;

        const maxCountRight = Math.max(
          ...data.map((item) => item.averageCount),
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
            value: '總人數',
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
            value: '人數／診',
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
          dataKey="consultationCount"
          name="總人數"
          barSize={20}
          fill="#009596"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="averageCount"
          name="每診平均人數"
          stroke="#82ca9d"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AverageConsultationCountLineChart;
