import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { FormWrapper } from '../../../../../components/form/Index.styled';

import { MailForResetWrapper } from './MailForReset.styles';
import { useState } from 'react';
import { ButtonAreaWrapper } from '../../../../layout/CommonWrapper.styled';
import { createPasswordChangeMail } from '../../../../../services/UserService';

interface IMailForResetFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().required('此為必填項目'),
  })
  .required();

const MailForReset: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMailForResetFormInputs>({
    resolver: yupResolver(schema),
  });
  const [userEmail, setUserEmail] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResendEmail = async () => {
    setIsButtonDisabled(true);
    const currentTime = new Date().getTime();
    setLastClickTime(currentTime);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);

    await onSendEmail({ email: userEmail });
  };

  const onSendEmail = async (data: IMailForResetFormInputs) => {
    const payload = {
      email: data.email,
    };

    const response = await createPasswordChangeMail(payload);
    if (response.success) {
      setIsSent(true);
      setUserEmail(data.email);
      setErrorMessage('');
    }
    if (response.error) {
      setErrorMessage(response.error);
    }
  };

  return (
    <PrimaryPageContent>
      <MailForResetWrapper>
        {isSent ? (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                請檢查您的電子信箱
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                請檢查您的電子信箱。您將會收到一封電子信箱，內含一個連結，您可以透過該連結重設您的帳戶密碼
              </Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {userEmail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                如果您沒有看到這封電子信箱，請檢查其他可能的地方，例如垃圾信箱、廣告信件、社交或其他資料夾
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <ButtonAreaWrapper>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleResendEmail}
                    disabled={isButtonDisabled}
                  >
                    重新發送
                  </Button>
                </ButtonAreaWrapper>
              </CardActions>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                輸入您的電子信箱
              </Typography>
              <FormWrapper onSubmit={handleSubmit(onSendEmail)}>
                <TextField
                  label="電子信箱"
                  type="email"
                  size="small"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={<>{errors.email?.message}</>}
                />
                <ButtonAreaWrapper>
                  <Button type="submit" variant="contained" color="primary">
                    下一步
                  </Button>
                </ButtonAreaWrapper>
              </FormWrapper>
            </CardContent>
          </Card>
        )}
      </MailForResetWrapper>
    </PrimaryPageContent>
  );
};

export default MailForReset;
