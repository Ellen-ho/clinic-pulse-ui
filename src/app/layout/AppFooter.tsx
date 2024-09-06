import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#143566',
        color: 'white',
        mt: 6,
      }}
    >
      <Box
        sx={{
          width: '1280px',
        }}
      >
        <Box
          sx={{
            padding: '25px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Link
              href="https://github.com/Ellen-ho/clinic-pulse-ui"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                gap: '8px',
                '&:hover': {
                  color: '#8FCFFF',
                },
              }}
            >
              <GitHubIcon />
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                前端
              </Typography>
            </Link>

            <Link
              href="https://github.com/Ellen-ho/clinic-pulse-api"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                gap: '8px',
                '&:hover': {
                  color: '#8FCFFF',
                },
              }}
            >
              <GitHubIcon />
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                後端
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Link href="/terms" underline="hover">
              Terms
            </Link>
            <Link href="/privacy" underline="hover">
              Privacy
            </Link>
          </Box>
          <Typography variant="body2" color="white" align="center">
            Copyright © {currentYear} Clinic Pulse
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AppFooter;
