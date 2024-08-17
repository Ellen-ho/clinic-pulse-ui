import { useCallback, useContext, useState } from 'react';
import { Container, Typography } from '@mui/material';
import RealConsultationStatistic from '../components/RealTimePatientCount';
import RealTimeFilters from '../components/RealTimeFilters';
import { UserRoleType } from '../../../../../types/Users';
import { AuthContext } from '../../../../../context/AuthContext';

export const clinics = [
  { label: '台北院區', id: '690d0ea3-9f8d-4143-b160-0661a003bf08' },
  { label: '台中院區', id: '16458ab0-4bb6-4141-9bf0-6d7398942d9b' },
  { label: '高雄院區', id: 'bf51c88e-9587-479e-994a-d15ec484c333' },
];

export const consultationRooms = [
  { label: '台北一診', id: '58602950-b172-45b7-b37c-c8461d73ecf6s' },
  { label: '台北二診', id: '15cb95f8-d56d-4721-b32c-74d166ae4a20s' },
  { label: '台中一診', id: 'ffeaea79-b30f-4f62-87b4-acee6c747d18s' },
  { label: '台中二診', id: 'ed770eec-1c86-4503-84bd-0ac7ea419273' },
  { label: '高雄一診', id: '9e18e1c5-1b63-4ca6-b818-927ae62ae39a' },
  { label: '高雄二診', id: 'a662ecb1-6f06-4b07-9967-95171da4b61f' },
];

interface IDashboardFilterValues {
  clinicId?: string;
  consultationRoomNumber?: string;
}

const DashboardPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;

  const [filters, setFilters] = useState<IDashboardFilterValues>({
    clinicId: '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
    consultationRoomNumber: 'ffeaea79-b30f-4f62-87b4-acee6c747d18',
  });

  const handleApplyFilters = useCallback(
    (newFilters: Partial<IDashboardFilterValues>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        看診紀錄列表
      </Typography>
      {!isDoctor && <RealTimeFilters onApply={handleApplyFilters} />}
      <RealConsultationStatistic {...filters} />
    </Container>
  );
};

export default DashboardPage;
