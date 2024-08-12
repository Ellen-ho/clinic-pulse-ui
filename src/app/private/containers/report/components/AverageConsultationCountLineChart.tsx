import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAverageConsultationCount } from '../../../../../services/ConsultationService';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';

interface IAverageConsultationCountProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

const AverageConsultationCountLineChart: React.FC<
  IAverageConsultationCountProps
> = ({ startDate, endDate, clinicId, doctorId, timePeriod, granularity }) => {
  const [chartData, setChartData] = useState<
    Array<{ name: string; averageCount: number }>
  >([]);
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

  const { data, error } = useSWR(
    `getAverageConsultationCount?${queryString}`,
    () => getAverageConsultationCount({ queryString }),
  );

  useEffect(() => {
    setMessage(null);
    setLoading(true);
    if (data) {
      if (data.totalSlots === 0) {
        setMessage('選擇區間沒有門診資料');
      } else {
        const formattedData = data.data
          .filter((item: any) => item.date)
          .map((item: any) => ({
            name: item.date,
            averageCount: item.averageCount,
          }));
        setChartData(formattedData);

        // Added: Compute min and max values for the y-axis
        const maxCount = Math.max(
          ...formattedData.map((item) => item.averageCount),
        );
        const minCount = Math.min(
          ...formattedData.map((item) => item.averageCount),
        );

        // Added: Update Y-axis domain state
        setYAxisDomain([minCount, maxCount]);
      }
      setLoading(false);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (message) return <p>{message}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: '時間', position: 'insideBottomRight', offset: -10 }}
        />
        <YAxis
          domain={yAxisDomain}
          label={{
            value: '人數/診',
            angle: -90,
            position: 'insideLeft',
            offset: -5,
          }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageCount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AverageConsultationCountLineChart;
