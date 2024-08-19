import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { signupUser } from '../../../../../services/UserService';
import { FormWrapper } from '../../../../../components/form/Index.styled';
import { ButtonAreaWrapper } from '../../../../layout/CommonWrapper.styled';
import { UserRoleType } from '../../../../../types/Users';
import { GenderType } from '../../../../../types/Share';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ISignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleType;
  onboardDate: Date;
  gender: GenderType;
  birthDate: Date;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(Object.values(UserRoleType)).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    onboardDate: yup.date().required(),
    gender: yup.string().oneOf(Object.values(GenderType)).required(),
    birthDate: yup.date().required(),
  })
  .required();

interface ISingUpCard {
  title?: string;
}

const SignUpCard: React.FC<ISingUpCard> = ({ title = '' }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSignUp = async (data: ISignUpFormInputs) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      onboardDate: data.onboardDate,
      gender: data.gender,
      birthDate: data.birthDate,
    };

    const response = await signupUser(payload);
    navigate('/signin');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            sx={{ marginBottom: '15px' }}
          >
            {title}
          </Typography>
          <FormWrapper onSubmit={handleSubmit(onSignUp)}>
            <FormControl>
              <InputLabel>身份</InputLabel>
              <Select
                label="User Role"
                size="small"
                {...register('role')}
                error={!!errors.role}
                defaultValue=""
              >
                <MenuItem value="ADMIN">管理員</MenuItem>
                <MenuItem value="DOCTOR">醫師</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="姓"
              type="lastName"
              size="small"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={<>{errors.lastName?.message}</>}
            />
            <TextField
              label="名"
              type="firstName"
              size="small"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={<>{errors.firstName?.message}</>}
            />
            <FormControl>
              <InputLabel>性別</InputLabel>
              <Select
                label="性別"
                size="small"
                {...register('gender')}
                error={!!errors.gender}
                defaultValue=""
              >
                <MenuItem value="MALE">男性</MenuItem>
                <MenuItem value="FEMALE">女性</MenuItem>
              </Select>
            </FormControl>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="生日"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="onboardDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="入職日期"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <TextField
              label="電子郵件"
              type="email"
              size="small"
              {...register('email')}
              error={!!errors.email}
              helperText={<>{errors.email?.message}</>}
            />
            <TextField
              label="預設密碼"
              type="password"
              size="small"
              {...register('password')}
              error={!!errors.password}
              helperText={<>{errors.password?.message}</>}
            />
            <ButtonAreaWrapper>
              <Button type="submit" variant="contained" color="primary">
                註冊
              </Button>
            </ButtonAreaWrapper>
          </FormWrapper>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
};

export default SignUpCard;
