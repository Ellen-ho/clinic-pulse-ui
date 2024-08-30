import { Route, Routes } from 'react-router-dom';
import TimeSlotPage from './pages/TimeSlotPage';

const TimeSlot: React.FC = () => {
  return (
    <Routes>
      <Route element={<TimeSlotPage />} path="/" />
    </Routes>
  );
};

export default TimeSlot;
