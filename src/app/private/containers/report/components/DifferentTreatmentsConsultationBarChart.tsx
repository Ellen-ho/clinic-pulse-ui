import { useEffect, useMemo, useState } from 'react';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';
import { getDifferentTreatmentConsultation } from '../../../../../services/ConsultationService';
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

interface IDifferentTreatmentsChartData {
  date: string;
  consultationCount: number;
  consultationWithAcupuncture: number;
  consultationWithMedicine: number;
  consultationWithBothTreatment: number;
  acupunctureRate: number;
  medicineRate: number;
  onlyAcupunctureCount: number;
  onlyMedicineCount: number;
  onlyAcupunctureRate: number;
  onlyMedicineRate: number;
  bothTreatmentRate: number;
}

interface IDifferentTreatmentsProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  doctorId?: string;
  timePeriod?: TimePeriodType;
  granularity?: Granularity;
}

const DifferentTreatmentsBarChart: React.FC<IDifferentTreatmentsProps> = ({
  startDate,
  endDate,
  clinicId,
  doctorId,
  timePeriod,
  granularity,
}) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [chartData, setChartData] = useState<IDifferentTreatmentsChartData[]>(
    [],
  );
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
    `GetDifferentTreatmentConsultation?${queryString}`,
    () => getDifferentTreatmentConsultation({ queryString }),
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
          ...data.data.map((item) => item.consultationCount),
        );
        const minCount = Math.min(
          ...data.data.map((item) => item.consultationCount),
        );

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
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="onlyAcupunctureCount" stackId="a" fill="#8884d8" />
        <Bar dataKey="onlyMedicineCount" stackId="a" fill="#82ca9d" />
        <Bar
          dataKey="consultationWithBothTreatment"
          stackId="a"
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DifferentTreatmentsBarChart;
