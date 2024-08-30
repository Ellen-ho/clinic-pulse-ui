import { Route, Routes } from 'react-router-dom';
import ConsultationListPage from './pages/ConsultationListPage';
import ConsultationDetailPage from './pages/ConsultationDetailPage';

const Consultation: React.FC = () => {
  return (
    <Routes>
      <Route element={<ConsultationListPage />} path="/" />
      <Route element={<ConsultationDetailPage />} path="/:id" />
    </Routes>
  );
};

export default Consultation;
