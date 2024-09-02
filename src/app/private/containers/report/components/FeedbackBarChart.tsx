import { useEffect, useMemo, useState } from 'react';
import { Granularity, TimePeriodType } from '../../../../../types/Share';
import useSWR from 'swr';
import { getFeedbackCountAndRate } from '../../../../../services/FeedbackService';
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
import CenterText from '../../../../../components/box/CenterText';
import { Box } from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';

interface IFeedbackChartData {
  date: string;
  feedbackCount: number;
  oneStarFeedbackCount: number;
  twoStarFeedbackCount: number;
  threeStarFeedbackCount: number;
  fourStarFeedbackCount: number;
  fiveStarFeedbackCount: number;
  waitAcupunctureReasonRate: number;
  waitBedReasonRate: number;
  waitConsultationReasonRate: number;
  waitMedicineReasonRate: number;
  doctorPoorAttitudeRate: number;
}

interface IFeedbackProps {
  startDate: string;
  endDate: string;
  clinicId?: string;
  timePeriod?: TimePeriodType;
  doctorId?: string;
  granularity?: Granularity;
}

const FeedbackBarChart: React.FC<IFeedbackProps> = ({
  startDate,
  endDate,
  clinicId,
  timePeriod,
  doctorId,
  granularity,
}) => {
  const [chartData, setChartData] = useState<IFeedbackChartData[]>([]);
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

  const { data, error } = useSWR(`getFeedbackCountAndRate?${queryString}`, () =>
    getFeedbackCountAndRate({ queryString }),
  );

  useEffect(() => {
    setMessage(null);
    setLoading(true);
    if (data) {
      if (data.data.length === 0) {
        setMessage('選擇區間沒有反饋資料');
        setLoading(false);
        setChartData([]);
      } else {
        setChartData(data.data);
        setLoading(false);
      }
      const maxCountLeft = Math.max(
        ...data.data.map((item) =>
          Math.max(
            item.oneStarFeedbackCount,
            item.twoStarFeedbackCount,
            item.threeStarFeedbackCount,
            item.fourStarFeedbackCount,
            item.fiveStarFeedbackCount,
          ),
        ),
      );
      const maxCountRight = Math.max(
        ...data.data.map((item) =>
          Math.max(
            item.waitAcupunctureReasonRate,
            item.waitBedReasonRate,
            item.waitConsultationReasonRate,
            item.waitMedicineReasonRate,
            item.doctorPoorAttitudeRate,
          ),
        ),
      );

      setYAxisDomainLeft([0, maxCountLeft + 5]);
      setYAxisDomainRight([0, maxCountRight + 5]);
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
        <Tooltip />
        <Legend />
        {/* 条形图展示每个星级评论人数 */}
        <Bar
          yAxisId="left"
          dataKey="oneStarFeedbackCount"
          name="一星評論人數"
          barSize={20}
          fill="#413ea0"
        />
        <Bar
          yAxisId="left"
          dataKey="twoStarFeedbackCount"
          name="二星評論人數"
          barSize={20}
          fill="#009596"
        />
        <Bar
          yAxisId="left"
          dataKey="threeStarFeedbackCount"
          name="三星評論人數"
          barSize={20}
          fill="#e28743"
        />
        <Bar
          yAxisId="left"
          dataKey="fourStarFeedbackCount"
          name="四星評論人數"
          barSize={20}
          fill="#ff7f50"
        />
        <Bar
          yAxisId="left"
          dataKey="fiveStarFeedbackCount"
          name="五星評論人數"
          barSize={20}
          fill="#6a0dad"
        />
        {/* 折线图展示每个负面原因的比例 */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="waitAcupunctureReasonRate"
          name="針灸等待時間長"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="waitBedReasonRate"
          name="床位分配等待時間長"
          stroke="#82ca9d"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="waitConsultationReasonRate"
          name="看診等待時間長"
          stroke="#ffc658"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="waitMedicineReasonRate"
          name="藥品等待時間長"
          stroke="#ff00ff"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="doctorPoorAttitudeRate"
          name="醫生態度差"
          stroke="#00ffff"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default FeedbackBarChart;
