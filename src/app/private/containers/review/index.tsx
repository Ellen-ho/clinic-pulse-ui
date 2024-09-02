import { Route, Routes } from 'react-router-dom';
import ReviewListPage from './pages/ReviewListPage';
import ReviewDetailPage from './pages/ReviewDetailPage';

const Review: React.FC = () => {
  return (
    <Routes>
      <Route element={<ReviewListPage />} path="/" />
      <Route element={<ReviewDetailPage />} path="/:id" />
    </Routes>
  );
};

export default Review;
