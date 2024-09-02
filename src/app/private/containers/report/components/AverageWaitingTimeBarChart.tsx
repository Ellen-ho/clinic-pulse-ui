import { useEffect, useMemo, useState } from 'react';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import { getAverageWaitingTime } from '../../../../../services/ConsultationService';
import useSWR from 'swr';
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
import DataLoading from '../../../../../components/signs/DataLoading';
import { Box, Typography } from '@mui/material';

interface IAverageWaitingTimeChartData {
  date: string;
  averageConsultationWait: number;
  averageBedAssignmentWait: number;
  averageAcupunctureWait: number;
  averageNeedleRemovalWait: number;
  averageMedicationWait: number;
}

interface IAverageWaitingTimeProps {
  data: IAverageWaitingTimeChartData[];
  granularity?: Granularity;
}

const AverageWaitingTimeBarChart: React.FC<IAverageWaitingTimeProps> = ({
  data,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IAverageWaitingTimeChartData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

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

  // const { data, error } = useSWR(`getAverageWaitingTime?${queryString}`, () =>
  //   getAverageWaitingTime({ queryString }),
  // );

  useEffect(() => {
    setMessage(null);
    setLoading(true);

    if (data) {
      if (data.length === 0) {
        setMessage('選擇區間沒有門診資料');
        setLoading(false);
        setChartData([]);
      } else {
        setChartData(data);
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
      <BarChart data={chartData} margin={{ top: 5, left: 20, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          domain={yAxisDomain}
          label={{
            value: '分鐘',
            angle: -90,
            position: 'insideLeft',
            offset: -5,
          }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="averageConsultationWait"
          name="看診平均等待時間"
          stackId="a"
          fill="#004d40"
        />
        <Bar
          dataKey="averageBedAssignmentWait"
          name="治療床平均等待時間"
          stackId="a"
          fill="#00796b"
        />
        <Bar
          dataKey="averageAcupunctureWait"
          name="針灸平均等待時間"
          stackId="a"
          fill="#009688"
        />
        <Bar
          dataKey="averageNeedleRemovalWait"
          name="取針平均等待時間"
          stackId="a"
          fill="#26a69a"
        />
        <Bar
          dataKey="averageMedicationWait"
          name="取藥平均等待時間"
          stackId="a"
          fill="#80cbc4"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AverageWaitingTimeBarChart;
