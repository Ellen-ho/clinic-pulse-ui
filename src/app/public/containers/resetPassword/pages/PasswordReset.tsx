import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { updatePassword } from '../../../../../services/UserService';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { PasswordResetWrapper } from './PasswordReset.styles';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

interface IPasswordResetFormInputs {
  newPassword: string;
  confirmNewPassword: string;
}

const schema = yup
  .object({
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().required(),
  })
  .required();

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordResetFormInputs>({
    resolver: yupResolver(schema),
  });

  const onResetPassword = async (data: IPasswordResetFormInputs) => {
    const payload = {
      newPassword: data.newPassword,
      resetToken: resetToken || '',
    };

    const response = await updatePassword(payload);

    if (response.success) {
      navigate('/signin');
    }
  };

  return (
    <PrimaryPageContent>
      <PasswordResetWrapper>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              更新密碼
            </Typography>
            <FormWrapper onSubmit={handleSubmit(onResetPassword)}>
              <TextField
                label="新的密碼"
                type="password"
                size="small"
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={<>{errors.newPassword?.message}</>}
              />
              <TextField
                label="再次確認新的密碼"
                type="password"
                size="small"
                {...register('confirmNewPassword')}
                error={!!errors.confirmNewPassword}
                helperText={<>{errors.confirmNewPassword?.message}</>}
              />
              <Button type="submit" variant="contained" color="primary">
                送出更新
              </Button>
            </FormWrapper>
          </CardContent>
        </Card>
      </PasswordResetWrapper>
    </PrimaryPageContent>
  );
};

export default PasswordReset;
