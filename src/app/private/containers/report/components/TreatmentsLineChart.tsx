import { useEffect, useMemo, useState } from 'react';
import { getDifferentTreatmentConsultation } from '../../../../../services/ConsultationService';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';
import { Box } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';
import CenterText from '../../../../../components/box/CenterText';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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

const TreatmentsBarChart: React.FC<IDifferentTreatmentsProps> = ({
  startDate,
  endDate,
  clinicId,
  doctorId,
  timePeriod,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IDifferentTreatmentsChartData[]>(
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

        const maxCountLeft = Math.max(
          ...data.data.map((item) =>
            Math.max(item.consultationCount, item.consultationCount),
          ),
        );
        const minCountLeft = 0;

        const maxCountRight = Math.max(
          ...data.data.map((item) =>
            Math.max(item.medicineRate, item.medicineRate),
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
          dataKey="onlyAcupunctureCount"
          name="純針灸治療人數"
          barSize={20}
          fill="#413ea0"
        />
        <Bar
          yAxisId="left"
          dataKey="onlyMedicineCount"
          name="純藥物治療人數"
          barSize={20}
          fill="#009596"
        />
        <Bar
          yAxisId="left"
          dataKey="consultationWithBothTreatment"
          name="針灸及藥物治療人數"
          barSize={20}
          fill="#e28743"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onlyAcupunctureRate"
          name="純針灸治療占比"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onlyMedicineRate"
          name="純藥物治療占比"
          stroke="#82ca9d"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="bothTreatmentRate"
          name="針灸及藥物治療占比"
          stroke="#ffc658"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TreatmentsBarChart;
