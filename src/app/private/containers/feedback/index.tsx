import { Route, Routes } from 'react-router-dom';
import FeedbackListPage from './pages/FeedbackListPage';
import FeedbackDetailPage from './pages/FeedbackDetailPage';

const Feedback: React.FC = () => {
  return (
    <Routes>
      <Route element={<FeedbackListPage />} path="/" />
      <Route element={<FeedbackDetailPage />} path="/:id" />
    </Routes>
  );
};

export default Feedback;
