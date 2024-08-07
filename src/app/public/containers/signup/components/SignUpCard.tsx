import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

interface ISignUpFormInputs {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const schema = yup
  .object({
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    role: yup.string().required(),
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
    formState: { errors },
  } = useForm<ISignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSignUp = async (data: ISignUpFormInputs) => {
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    const response = await signupUser(payload);
    navigate('/signin');
  };

  return (
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
          <TextField
            label="DisplayName"
            type="displayName"
            size="small"
            {...register('displayName')}
            error={!!errors.displayName}
            helperText={<>{errors.displayName?.message}</>}
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
          <TextField
            label="Confirm Password"
            type="password"
            size="small"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={<>{errors.confirmPassword?.message}</>}
          />
          <FormControl>
            <InputLabel>User Role</InputLabel>
            <Select
              label="User Role"
              size="small"
              {...register('role')}
              error={!!errors.role}
              defaultValue=""
            >
              <MenuItem value="PATIENT">Patient</MenuItem>
              <MenuItem value="DOCTOR">Doctor</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox name="confirm" color="primary" />}
            label={
              <Typography variant="body2">
                By continuing, I confirm that I am over 18 years old and agree
                to Medi Connect's{' '}
                <Link href="#" underline="hover">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
              </Typography>
            }
          />

          <ButtonAreaWrapper>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            <Button variant="text" onClick={() => navigate('/signin')}>
              Sign In
            </Button>
          </ButtonAreaWrapper>
        </FormWrapper>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
