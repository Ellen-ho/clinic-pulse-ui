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

interface IAverageWaitingTimeChartData {
  date: string;
  averageConsultationWait: number;
  averageBedAssignmentWait: number;
  averageAcupunctureWait: number;
  averageNeedleRemovalWait: number;
  averageMedicationWait: number;
}

interface IAverageWaitingTimeProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

const AverageWaitingTimeLineChart: React.FC<IAverageWaitingTimeProps> = ({
  startDate,
  endDate,
  clinicId,
  doctorId,
  timePeriod,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IAverageWaitingTimeChartData[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

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

  const { data, error } = useSWR(`getAverageWaitingTime?${queryString}`, () =>
    getAverageWaitingTime({ queryString }),
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
    // const maxCount = Math.max(
    //   ...data.data.map((item) => item.),
    // );
    // const minCount = Math.min(
    //   ...data.data.map((item) => item.consultationCount),
    // );

    // setYAxisDomain([minCount, maxCount + 5]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (message) return <p>{message}</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="averageConsultationWait" stackId="a" fill="#8884d8" />
        <Bar dataKey="averageBedAssignmentWait" stackId="a" fill="#82ca9d" />
        <Bar dataKey="averageAcupunctureWait" stackId="a" fill="#ffc658" />
        <Bar dataKey="averageNeedleRemovalWait" stackId="a" fill="#ff7f50" />
        <Bar dataKey="averageMedicationWait" stackId="a" fill="#6a0dad" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AverageWaitingTimeLineChart;
