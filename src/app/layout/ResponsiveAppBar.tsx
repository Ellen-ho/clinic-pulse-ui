import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserRoleType } from '../../types/Users';
import { Badge, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { CommonWrapper } from './CommonWrapper.styled';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ImageAvatar from '../../components/avatar/ImageAvatar';
import MenuIcon from '@mui/icons-material/Menu';
import { NotificationContext } from '../../context/NotificationContext';
import { getNotificationHints } from '../../services/NotificationService';
import useSWR from 'swr';
import useNavMenu, { IPage } from '../../hooks/UseNavMenu';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
}

const ResponsiveAppBar: React.FC = () => {
  const { menu } = useNavMenu();
  const { state, dispatch } = useContext(AuthContext);
  const isSignedIn = state.isSignedIn;
  const currentUserRole = state.currentUser?.role ?? UserRoleType.DOCTOR;
  const avatar = state.currentUser?.avatar;
  const [currentMenu, setCurrentMenu] = useState<IPage | null>(null);
  const { state: notificationState, dispatch: notificationDispatch } =
    useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
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

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleNavigate = (link: string) => {
    navigate(link);
    handleClose();
  };

  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
    navigate('/');
  };

  if (!isSignedIn) {
    return null;
  }

  const handleNotificationClick = async () => {
    notificationDispatch({
      type: 'UPDATE_NOTIFICATION',
      payload: {
        hasUnread: false,
      },
    });
    navigate('/notification');
  };

  useSWR(
    isSignedIn ? 'getNotificationHints' : null,
    () => getNotificationHints(),
    {
      onSuccess: (data) => {
        notificationDispatch({
          type: 'UPDATE_NOTIFICATION',
          payload: {
            hasUnread: data.hasUnReadNotification,
          },
        });
      },
    },
  );

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
            {currentUserRole === UserRoleType.DOCTOR && (
              <Chip
                label="醫師"
                variant="outlined"
                size="small"
                sx={{ color: '#fff' }}
              />
            )}
            {currentUserRole === UserRoleType.ADMIN && (
              <Chip
                label="管理員"
                variant="outlined"
                size="small"
                sx={{ color: '#fff' }}
              />
            )}
          </Box>
          <Box sx={{ display: { py: 2 } }}>
            {isSignedIn && (
              <Box sx={{ display: 'flex' }}>
                {menu.map((page) => (
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
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={handleNotificationClick}
                >
                  <Badge
                    color="warning"
                    variant="dot"
                    overlap="circular"
                    invisible={!notificationState.hasUnread}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                {currentUserRole !== UserRoleType.ADMIN ? (
                  <IconButton
                    sx={{ color: 'white' }}
                    onClick={handleProfileMenuOpen}
                  >
                    <ImageAvatar
                      imageUrl={avatar}
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                      }}
                    />
                    <MenuIcon sx={{ display: { xs: 'flex', md: 'none' } }} />
                  </IconButton>
                ) : (
                  <Button
                    onClick={handleSignOut}
                    sx={{ color: 'white', display: { xs: 'none', md: 'flex' } }}
                  >
                    登出
                  </Button>
                )}
                <Menu
                  anchorEl={profileMenuAnchorEl}
                  open={Boolean(profileMenuAnchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleSignOut}>登出</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </CommonWrapper>
    </AppBar>
  );
};

export default ResponsiveAppBar;
