import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserRoleType } from '../../types/Users';
import { Menu, MenuItem } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { CommonWrapper } from './CommonWrapper.styled';

interface IPageItem {
  title: string;
  link: string;
  permission?: UserRoleType[];
  subMenu?: IPageItem[];
}

interface IPage extends IPageItem {
  subMenu?: IPageItem[];
}

const topPages: IPage[] = [
  {
    title: '即時看板',
    link: '/dashboard',
    permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
  },
  {
    title: '看診紀錄',
    link: '/consultation',
    permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
  },
  {
    title: '反饋紀錄',
    link: '/feedback',
    permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
  },
  {
    title: '統計中心',
    link: '',
    permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
    subMenu: [
      { title: '門診統計中心', link: '/consultation-report-center' },
      { title: '反饋統計中心', link: '/feedback-report-center' },
    ],
  },
  {
    title: '人員管理',
    link: '',
    permission: [UserRoleType.ADMIN],
    subMenu: [
      // { title: '人員清單', link: '' },
      { title: '人員註冊', link: '/signup' },
    ],
  },
  // {
  //   title: '帳號管理',
  //   link: '/account-management',
  //   permission: [UserRoleType.DOCTOR],
  // },
];

const ResponsiveAppBar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const isSignedIn = state.isSignedIn;
  const currentUserRole = state.currentUser?.role ?? UserRoleType.DOCTOR;
  const [currentMenu, setCurrentMenu] = useState<IPage | null>(null);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: IPage,
  ) => {
    if (page.subMenu) {
      setAnchorEl(event.currentTarget);
      setCurrentMenu(page);
    } else {
      navigate(page.link);
      setAnchorEl(null);
      setCurrentMenu(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (link: string) => {
    navigate(link);
    handleClose();
  };

  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
    navigate('/signin');
  };

  return (
    <AppBar position="static">
      <CommonWrapper>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
            <HealthAndSafetyIcon
              onClick={() => navigate(isSignedIn ? '/dashboard' : '/')}
              sx={{
                mr: 1,
              }}
            />
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
                {topPages
                  .filter((page) => page.permission?.includes(currentUserRole))
                  .map((page) => (
                    <Button
                      key={page.title}
                      onClick={(event) => handleMenuClick(event, page)}
                      sx={{ color: 'white' }}
                    >
                      {page.title}
                    </Button>
                  ))}

                <Menu
                  id="dynamic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {currentMenu?.subMenu?.map((subPage) => (
                    <MenuItem
                      key={subPage.title}
                      onClick={() => handleNavigate(subPage.link)}
                    >
                      {subPage.title}
                    </MenuItem>
                  ))}
                </Menu>

                <Button onClick={handleSignOut} sx={{ color: 'white' }}>
                  登出
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </CommonWrapper>
    </AppBar>
  );
};

export default ResponsiveAppBar;
