import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DataLoading from '../../../../../components/signs/DataLoading';
import { useContext, useEffect, useState } from 'react';
import {
  getDoctorProfile,
  IGetDoctorProfileResponse,
} from '../../../../../services/DoctorService';
import useSWR from 'swr';
import { AuthContext } from '../../../../../context/AuthContext';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const ProfileAndAccountManagementPage: React.FC = () => {
  const { state } = useContext(AuthContext);
  const doctorId = state.doctorId || '';
  const isDoctor = state.doctorId != null;

  const [editableData, setEditableData] =
    useState<IGetDoctorProfileResponse | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState<boolean>(false);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);

  const { data: profileData, isLoading } = useSWR<IGetDoctorProfileResponse>(
    'getDoctorProfile',
    () =>
      getDoctorProfile({
        doctorId: doctorId as string,
      }),
  );

  useEffect(() => {
    if (profileData) {
      setEditableData(profileData);
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 在這裡處理文件上傳邏輯，例如使用 FormData 將文件發送到後端
      console.log('Selected file:', file);
      // 假設你想即時顯示選擇的頭像
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableData((prev) =>
          prev ? { ...prev, avatar: reader.result as string } : null,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarEditClick = () => {
    // 觸發文件選擇器
    document.getElementById('avatar-upload')?.click();
  };

  const handleSave = async () => {
    if (editableData) {
      // 保存資料的邏輯
    }
    setIsEditingAvatar(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  if (isLoading || !editableData) {
    return <DataLoading sx={{ zIndex: '1' }} />;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                alt="Doctor Avatar"
                src={editableData.avatar || '/default-avatar.png'}
                sx={{
                  width: 100,
                  height: 100,
                  margin: 'auto',
                  marginBottom: '20px',
                }}
              />
              {isDoctor && (
                <>
                  <IconButton
                    onClick={handleAvatarEditClick}
                    sx={{ position: 'absolute', bottom: 0, right: 0 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </Grid>
        </Grid>

        <Typography
          gutterBottom
          variant="h4"
          component="div"
          align="center"
          sx={{ marginBottom: '20px' }}
        >
          {`${editableData.lastName} ${editableData.firstName}`}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          性別: {editableData.gender}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          生日: {new Date(editableData.birthDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          到職日期: {new Date(editableData.onboardDate).toLocaleDateString()}
        </Typography>
        {editableData.resignationDate && (
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            離職日期:{' '}
            {new Date(editableData.resignationDate).toLocaleDateString()}
          </Typography>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {isEditingEmail ? (
            <TextField
              label="電子郵件"
              name="email"
              value={editableData.email}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginRight: '10px' }}
            />
          ) : (
            <Typography variant="body1">
              電子郵件: {editableData.email}
            </Typography>
          )}
          {isDoctor && (
            <IconButton
              onClick={() => setIsEditingEmail(!isEditingEmail)}
              sx={{ marginLeft: '10px' }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {isEditingPassword ? (
            <TextField
              label="密碼"
              name="hashedPassword"
              type="password"
              value={editableData.hashedPassword || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginRight: '10px' }}
            />
          ) : (
            <Typography variant="body1">密碼: ********</Typography>
          )}
          {isDoctor && (
            <IconButton
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              sx={{ marginLeft: '10px' }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>

        {isDoctor &&
          (isEditingAvatar || isEditingEmail || isEditingPassword) && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              fullWidth
            >
              儲存
            </Button>
          )}
      </CardContent>
    </Card>
  );
};

export default ProfileAndAccountManagementPage;
