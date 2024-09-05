import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        隱私政策
      </Typography>

      <Typography variant="body1" paragraph>
        我們重視您的隱私。本隱私政策解釋了我們如何收集、使用和保護您的個人信息。
      </Typography>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          1. 資料收集
        </Typography>
        <Typography variant="body1" paragraph>
          我們可能會在您使用我們的網站時收集以下類型的個人訊息：姓名、電子信箱，以及您主動提供的其他信息。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          2. 資料使用
        </Typography>
        <Typography variant="body1" paragraph>
          我們使用您的個人訊息來提供和改進我們的服務、與您聯繫，並根據法律要求保護我們的合法權益。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          3. 資料保護
        </Typography>
        <Typography variant="body1" paragraph>
          我們採取適當的安全措施來防止未經授權的訪問、洩漏、修改或刪除您的個人訊息。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          4. 隱私政策更改
        </Typography>
        <Typography variant="body1" paragraph>
          我們可能會不時更新本隱私政策。請定期查看以確保您了解任何更改。
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="body2">
          如果您對本隱私政策有任何疑問，請聯繫我們：
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

export default PrivacyPage;
