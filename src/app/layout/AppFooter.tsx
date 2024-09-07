import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

function AppFooter() {
  const currentYear = new Date().getFullYear();
  const linkColor = '#8FCFFF';

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
            }}
          >
            <Link
              href="https://github.com/Ellen-ho/clinic-pulse-api"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                '&:hover': {
                  color: '#ccc',
                },
              }}
            >
              <GitHubIcon sx={{ color: 'white', fontSize: '2rem' }} />
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
