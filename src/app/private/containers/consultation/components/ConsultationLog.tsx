import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getSingleConsultation } from '../../../../../services/ConsultationService';
import ConsultationTimeline from './ConsultationTimeLine';
import BasicCard from '../../../../../components/card/BasicCard';

const ConsultationLog: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR('getSingleConsultation', () =>
    getSingleConsultation({
      consultationId: id as string,
    }),
  );

  return (
    <BasicCard title="時間紀錄">
      {isLoading || !data ? (
        <>Loading</>
      ) : (
        <ConsultationTimeline consultation={data} />
      )}
    </BasicCard>
  );
};

export default ConsultationLog;
