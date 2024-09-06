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
import signInBgUrl from '/src/assets/sign_in_bg.png';
import DataLoading from '../../../../components/signs/DataLoading';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
interface ISignInFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email('請輸入正確的電子信箱')
      .required('此欄位為必填項目'),
    password: yup.string().required('此欄位為必填項目'),
  })
  .required();

const SignIn: React.FC = () => {
  const [isloading, setLoading] = useState<boolean>(false);
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
    try {
      setLoading(true);
      const response = await signinUser(data);
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <SignInWrapper>
      <Card
        sx={{
          display: 'flex',
          borderRadius: '16px',
          overflow: 'hidden',
          width: '80%',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          maxWidth: '1200px',
        }}
      >
        <Grid
          item
          xs={4}
          sx={{ display: { xs: 'none', md: 'block' }, width: '38%' }}
        >
          <Box
            sx={{
              height: '100%',
              backgroundImage: `url("${signInBgUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{ width: '62%', display: 'flex', alignItems: 'center' }}
        >
          <CardContent sx={{ flex: 1 }}>
            {isloading && <DataLoading />}
            <Typography variant="h4" align="center" gutterBottom>
              登入
            </Typography>
            <FormWrapper onSubmit={handleSubmit(onSignIn)}>
              <TextField
                label="電子信箱"
                type="email"
                size="small"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                label="密碼"
                type="password"
                size="small"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
              />
              <ButtonAreaWrapper gap="20px">
                <Button type="submit" variant="contained" color="primary">
                  登入
                </Button>
                <Button
                  onClick={() => navigate('/input-email')}
                  sx={{ borderRadius: '10px' }}
                  variant="outlined"
                  startIcon={<MedicalInformationIcon />}
                >
                  {' '}
                  忘記密碼 / 修改密碼
                </Button>
              </ButtonAreaWrapper>

              <Alert severity="info" sx={{ mt: 3 }}>
                <AlertTitle>測試帳號</AlertTitle>
                <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Grid item>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        border: '1px solid #1976d2',
                        borderRadius: '16px',
                        minWidth: '70px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', lineHeight: '1.43' }}
                      >
                        管理者
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="div">
                      帳號：admin@example.com，密碼：123456
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        border: '1px solid #1976d2',
                        borderRadius: '16px',
                        minWidth: '70px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.875rem', lineHeight: '1.43' }}
                      >
                        醫師
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="div">
                      帳號：doctor_zhang@example.com，密碼：123456
                    </Typography>
                  </Grid>
                </Grid>
              </Alert>
            </FormWrapper>
          </CardContent>
        </Grid>
      </Card>
    </SignInWrapper>
  );
};

export default SignIn;
