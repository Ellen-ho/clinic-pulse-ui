import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const topPages = [
  { title: '儀表板', link: '/dashboard', permission: [] },
  {
    title: '看診紀錄',
    link: '/consultation',
  },
  {
    title: '統計中心',
    link: '/report-center',
  },
];

const ResponsiveAppBar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const isSignedIn = state.isSignedIn;

  const navigate = useNavigate();

  const handlePageClick = (link: string) => {
    navigate(link);
  };

  const handleSignOut = () => {
    dispatch({
      type: 'SIGN_OUT',
    });
    navigate('/signin');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={isSignedIn ? '/dashboard' : '/'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Clinic Pulse
            </Typography>
          </Box>

          <Box sx={{ display: { py: 2 } }}>
            {isSignedIn && (
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {topPages.map((page) => {
                    return (
                      <Button
                        key={page.title}
                        onClick={() => handlePageClick(page.link)}
                        sx={{ color: 'white' }}
                      >
                        {page.title}
                      </Button>
                    );
                  })}
                  <Button onClick={handleSignOut} sx={{ color: 'white' }}>
                    登出
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
