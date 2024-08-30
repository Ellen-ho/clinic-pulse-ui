import { Route, Routes } from 'react-router-dom';
import DoctorProfileDetail from './pages/DoctorProfileDetail';

const Profile: React.FC = () => {
  return (
    <Routes>
      <Route element={<DoctorProfileDetail />} path="/" />
    </Routes>
  );
};

export default Profile;
