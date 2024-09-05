import React from 'react';
import { Container, Typography, Box, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        服務條款
      </Typography>

      <Typography variant="body1" paragraph>
        歡迎來到 Clinic Pulse！這些條款和條件概述了使用 Clinic Pulse
        網站和服務的規則和規定。訪問本網站即表示您同意這些條款和條件。
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          1. 用戶責任
        </Typography>
        <Typography variant="body1" paragraph>
          用戶必須確保其使用 Clinic Pulse
          提供的服務符合所有適用的法律和法規。用戶有責任保持其帳戶信息的機密性，並對在其帳戶下發生的所有活動負責。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          2. 帳戶註冊
        </Typography>
        <Typography variant="body1" paragraph>
          為了訪問我們服務的某些功能，我門會爲您註冊一個帳戶。您同意提供並保持準確、最新和完整的信息。如果提供的信息不準確或不完整，Clinic
          Pulse 保留暫停或終止您的帳戶的權利。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          3. 數據使用和同意
        </Typography>
        <Typography variant="body1" paragraph>
          通過使用我們的服務，您同意按照我們的隱私政策收集和使用您的數據。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          4. 責任限制
        </Typography>
        <Typography variant="body1" paragraph>
          Clinic Pulse
          不對任何間接、附帶、特別、後果性或懲罰性損害，或任何利潤或收入損失，無論是直接還是間接的，或任何數據、使用、信譽或其他無形損失負責，
          任何未經授權的訪問或使用我們的服務和/或儲存在其中的任何個人訊息而導致的。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          5. 法律規範
        </Typography>
        <Typography variant="body1" paragraph>
          這些條款和條件受醫療法規管轄並按其解釋。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          6. 條款變更
        </Typography>
        <Typography variant="body1" paragraph>
          我們保留修改這些條款的權利。通過在我們的網站上發布新條款來通知您任何更改。您在任何此類更改後繼續使用服務，即表示您接受新的條款。
        </Typography>
      </Box>

      <Box mt={3} display="flex" alignItems="center">
        <Typography variant="body2">
          如果您對這些條款有任何疑問，請聯繫我們：
          <Typography
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            support@clinicpulse.com
          </Typography>
          。
        </Typography>
      </Box>
      <Box mt={2} display="flex" justifyContent="flex-start">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'primary.main' }}
        >
          回首頁
        </Button>
      </Box>
    </Container>
  );
};

export default TermsPage;
