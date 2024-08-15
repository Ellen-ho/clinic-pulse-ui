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
              <InputLabel>User Role</InputLabel>
              <Select
                label="User Role"
                size="small"
                {...register('role')}
                error={!!errors.role}
                defaultValue=""
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="DOCTOR">Doctor</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="FirstName"
              type="firstName"
              size="small"
              {...register('firstName')}
              error={!!errors.firstName}
              helperText={<>{errors.firstName?.message}</>}
            />
            <TextField
              label="LastName"
              type="lastName"
              size="small"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={<>{errors.lastName?.message}</>}
            />
            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                size="small"
                {...register('gender')}
                error={!!errors.gender}
                defaultValue=""
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
                <MenuItem value="NON_BINARY">NON_BINARY</MenuItem>
              </Select>
            </FormControl>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Birth Date"
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
                  label="Onboard Date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <TextField
              label="Email"
              type="email"
              size="small"
              {...register('email')}
              error={!!errors.email}
              helperText={<>{errors.email?.message}</>}
            />
            <TextField
              label="Password"
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
