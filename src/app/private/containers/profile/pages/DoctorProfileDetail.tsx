import { useContext, useEffect, useState } from 'react';
import { IDoctor } from '../../../../../types/Doctors';
import { GenderType } from '../../../../../types/Share';
import { AuthContext } from '../../../../../context/AuthContext';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import useSWR from 'swr';
import toast from 'react-hot-toast';

import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import DataLoading from '../../../../../components/signs/DataLoading';
import AvatarUploadDialog from '../components/AvatarUploadDialog';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import { getDoctorProfile } from '../../../../../services/DoctorService';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { UserRoleType } from '../../../../../types/Users';
import { useLocation, useParams } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultDoctor: IDoctor = {
  avatar: null,
  firstName: '',
  lastName: '',
  gender: GenderType.MALE,
  birthDate: new Date(),
  onboardDate: new Date(),
  resignationDate: null,
  email: '',
};

const DoctorProfileDetail: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState<IDoctor>(defaultDoctor);
  const [isAvatarUploadDialogOpen, setAvatarUploadDialogOpen] = useState(false);
  const isDoctor = state.currentUser?.role === UserRoleType.DOCTOR;
  const isAdmin = state.currentUser?.role === UserRoleType.ADMIN;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorIdFromQuery = queryParams.get('doctorId');

  const doctorId = doctorIdFromQuery || state.doctorId || '';

  const handleImageUpload = (imageUrl: string) => {
    setProfile((prev) => ({ ...prev, avatar: imageUrl }));
    setAvatarUploadDialogOpen(false);
    toast.success('相片更新成功！');
  };

  const handleOpenAvatarUploadDialog = () => {
    setAvatarUploadDialogOpen(true);
  };

  const shouldFetchData = !!doctorId;

  const { isLoading, mutate } = useSWR(
    shouldFetchData ? ['getDoctorProfile', doctorId] : null,
    () => getDoctorProfile({ doctorId: doctorId as string }),
    {
      onSuccess: (data) => {
        const profile = {
          ...data,
        };

        const { createdAt, updatedAt, id, ...newProfile } = profile;

        const profileForForm = {
          ...newProfile,
        };

        setProfile(profileForForm);

        dispatch({
          type: 'UPDATE_PROFILE',
          payload: {
            avatar: profile.avatar,
            doctorId: doctorId,
          },
        });
      },
    },
  );

  return (
    <>
      <PrimaryPageContent>
        <CommonWrapper>
          <PrimaryPageTop pageTitle="個人資料" />
          {isLoading ? (
            <DataLoading />
          ) : profile == null ? (
            <Typography variant="h5" component="div">
              未找到個人資料
            </Typography>
          ) : (
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mb: 2,
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <ImageAvatar
                      imageUrl={profile.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                    {isDoctor && (
                      <IconButton
                        onClick={handleOpenAvatarUploadDialog}
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: 'white',
                          transform: 'translate(25%, 25%)',
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {/* 全名 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    姓名: {profile.lastName}
                    {profile.firstName}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    性别: {profile.gender === 'MALE' ? '男' : '女'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    到職日期:{' '}
                    {new Date(profile.onboardDate).toISOString().split('T')[0]}
                  </Typography>
                </Box>

                {/* 有条件地显示离职日期 */}
                {profile.resignationDate && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      離職日期:{' '}
                      {profile.resignationDate.toISOString().split('T')[0]}
                    </Typography>
                  </Box>
                )}

                {/* 电子邮件部分，带有编辑功能 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    電子信箱: {profile.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </CommonWrapper>
      </PrimaryPageContent>
      {isDoctor && (
        <AvatarUploadDialog
          isOpen={isAvatarUploadDialogOpen}
          onClose={() => setAvatarUploadDialogOpen(false)}
          imageUrl={profile.avatar}
          onImageUpload={handleImageUpload}
          id={doctorId}
        />
      )}
    </>
  );
};

export default DoctorProfileDetail;
