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
import { getConsultationOnsiteCanceledAndBooking } from '../../../../../services/ConsultationService';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import CenterText from '../../../../../components/box/CenterText';

interface ICanceledAndBookingChartData {
  date: string;
  onlineBookingCount: number;
  onsiteCancelCount: number;
  consultationCount: number;
  onlineBookingRate: number;
  onsiteCancelRate: number;
}

interface ICanceledAndBookingProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

const CanceledAndBookingLineChart: React.FC<ICanceledAndBookingProps> = ({
  startDate,
  endDate,
  clinicId,
  doctorId,
  timePeriod,
  granularity,
}) => {
  const [chartData, setChartData] = useState<ICanceledAndBookingChartData[]>(
    [],
  );
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
    `GetConsultationOnsiteCanceledAndBooking?${queryString}`,
    () => getConsultationOnsiteCanceledAndBooking({ queryString }),
  );

  useEffect(() => {
    setMessage(null);
    setLoading(true);
    if (data) {
      if (data.totalConsultations === 0) {
        setMessage('選擇區間沒有門診資料');
      } else {
        setChartData(data.data);

        const maxCount = Math.max(
          ...data.data.map((item) =>
            Math.max(item.onlineBookingCount, item.onsiteCancelCount),
          ),
        );
        const minCount = 0;

        setYAxisDomain([minCount, maxCount + 5]);
      }
      setLoading(false);
    }
  }, [data]);

  if (loading)
    return (
      <CenterText>
        <>{'Loading...'}</>
      </CenterText>
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
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="onlineBookingCount"
          barSize={20}
          fill="#413ea0"
        />
        <Bar
          yAxisId="left"
          dataKey="onsiteCancelCount"
          barSize={20}
          fill="#ff7300"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onlineBookingRate"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onsiteCancelRate"
          stroke="#82ca9d"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CanceledAndBookingLineChart;
