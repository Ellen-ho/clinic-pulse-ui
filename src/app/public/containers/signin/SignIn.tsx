import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { SignInWrapper } from './SignIn.styled';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../components/form/Index.styled';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { ButtonAreaWrapper } from '../../../layout/CommonWrapper.styled';
import { signinUser } from '../../../../services/UserService';

interface ISignInFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn: React.FC = () => {
  const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSignIn = async (data: ISignInFormInputs) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const response = await signinUser(payload);
    dispatch({
      type: 'SIGN_IN',
      payload: {
        token: response.token,
        currentUser: {
          id: response.user.id,
          role: response.user.role,
        },
        doctorId: response.doctorId,
      },
    });
  };

  return (
    <PrimaryPageContent>
      <SignInWrapper>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              <PersonPinIcon sx={{ fontSize: 50, color: '#777' }} />
            </Typography>
            <FormWrapper onSubmit={handleSubmit(onSignIn)}>
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
                  Sign In
                </Button>
              </ButtonAreaWrapper>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="text" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </Grid>
            </FormWrapper>
          </CardContent>
        </Card>
      </SignInWrapper>
    </PrimaryPageContent>
  );
};

export default SignIn;
