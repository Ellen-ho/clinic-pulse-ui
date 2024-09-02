import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { SignInWrapper } from './SignIn.styled';
import {
  Alert,
  AlertTitle,
  Box,
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
import { UserRoleType } from '../../../../types/Users';
import signInBgUrl from '/src/assets/sign_in_bg.jpg';
import DataLoading from '../../../../components/signs/DataLoading';
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
  const [isloading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const response = await signinUser(payload);
    dispatch({
      type: 'SIGN_IN',
      payload: {
        token: response.token,
        currentUser: {
          id: response.user.id,
          role: response.user.role as UserRoleType,
          avatar: response.user.avatar,
        },
        permissions: response.permissions,
        doctorId: response.doctorId,
      },
    });
    setLoading(false);
  };

  return (
    <PrimaryPageContent>
      <SignInWrapper>
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            backgroundImage: `url("${signInBgUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Card sx={{ position: 'relative', zIndex: '1' }}>
          {isloading && <DataLoading sx={{ zIndex: '1' }} />}
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
                label="密碼"
                type="password"
                size="small"
                {...register('password')}
                error={!!errors.password}
                helperText={<>{errors.password?.message}</>}
              />
              <ButtonAreaWrapper>
                <Button type="submit" variant="contained" color="primary">
                  登入
                </Button>
              </ButtonAreaWrapper>

              <Alert severity="info">
                <AlertTitle>測試帳號</AlertTitle>
                <div>帳號：admin@example.com，密碼：123456</div>
                <div>帳號：doctor_zhang@example.com，密碼：123456</div>
              </Alert>
            </FormWrapper>
          </CardContent>
        </Card>
      </SignInWrapper>
    </PrimaryPageContent>
  );
};

export default SignIn;
