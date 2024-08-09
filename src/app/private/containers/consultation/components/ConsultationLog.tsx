import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getSingleConsultation } from '../../../../../services/ConsultationService';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import ConsultationTimeline from './ConsultationTimeLine';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';

const ConsultationLog: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSWR('getSingleConsultation', () =>
    getSingleConsultation({
      consultationId: id as string,
    }),
  );

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
        {isLoading || !data ? (
          <>Loading</>
        ) : (
          <ConsultationTimeline consultation={data} />
        )}
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationLog;
