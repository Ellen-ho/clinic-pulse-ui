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
import {
  FiltersContext,
  useFiltersContext,
} from '../../context/FiltersContext';
import { getDoctorProfile } from '../../services/DoctorService';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
}

interface IPageItem {
  title: string;
  link: string;
  permission?: UserRoleType[];
  subMenu?: IPageItem[];
}

interface IPage extends IPageItem {
  subMenu?: IPageItem[];
}

const ResponsiveAppBar: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const isSignedIn = state.isSignedIn;
  const currentUserRole = state.currentUser?.role ?? UserRoleType.DOCTOR;
  const avatar = state.currentUser?.avatar;
  const { doctors } = useFiltersContext();
  const [currentMenu, setCurrentMenu] = useState<IPage | null>(null);
  const { state: notificationState, dispatch: notificationDispatch } =
    useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [doctorMenuAnchorEl, setDoctorMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const doctorMenuOpen = Boolean(doctorMenuAnchorEl);

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
      link: '',
      permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
      subMenu: [
        {
          title: '問券反饋',
          link: '/feedback',
          permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
        },
        {
          title: 'Google評論',
          link: '/review',
          permission: [UserRoleType.ADMIN],
        },
      ],
    },
    {
      title: '統計中心',
      link: '',
      permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
      subMenu: [
        {
          title: '門診統計中心',
          link: '/consultation-report-center',
          permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
        },
        {
          title: '反饋統計中心',
          link: '/feedback-report-center',
          permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
        },
      ],
    },
    {
      title: '門診表',
      link: '/time-slot',
      permission: [UserRoleType.DOCTOR, UserRoleType.ADMIN],
    },
    {
      title: '人員管理',
      link: '',
      permission: [UserRoleType.ADMIN],
      subMenu: [
        { title: '人員清單', link: '/profile-management' },
        { title: '人員註冊', link: '/signup' },
      ],
    },
    {
      title: '個人中心',
      link: '/profile',
      permission: [UserRoleType.DOCTOR],
    },
  ];

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

  const handleDoctorMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setDoctorMenuAnchorEl(event.currentTarget);
  };

  const handleDoctorMenuClose = () => {
    setDoctorMenuAnchorEl(null);
  };

  const handleDoctorProfileClick = async (doctorId: string) => {
    try {
      const doctorProfile = await getDoctorProfile({ doctorId });
      navigate(`/profile?doctorId=${doctorId}`);
    } catch (error) {
      console.error('Failed to fetch doctor profile:', error);
    } finally {
      handleDoctorMenuClose();
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
    navigate('/signin');
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
                  {currentMenu?.subMenu
                    ?.filter((subPage) =>
                      subPage.permission?.includes(currentUserRole),
                    )
                    .map((subPage) => (
                      <MenuItem
                        key={subPage.title}
                        onClick={() => handleNavigate(subPage.link)}
                        onMouseEnter={
                          subPage.title === '人員清單'
                            ? handleDoctorMenuClick
                            : undefined
                        }
                      >
                        {subPage.title}
                      </MenuItem>
                    ))}
                  {/* 醫師子列表 */}
                  {currentMenu?.title === '人員管理' && (
                    <Menu
                      anchorEl={doctorMenuAnchorEl}
                      open={Boolean(doctorMenuAnchorEl)}
                      onClose={handleDoctorMenuClose}
                      MenuListProps={{
                        onMouseLeave: handleDoctorMenuClose,
                      }}
                    >
                      {doctors.map((doctor) => (
                        <MenuItem
                          key={doctor.id}
                          onClick={() => handleDoctorProfileClick(doctor.id)}
                        >
                          {doctor.fullName} {}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
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

                {/* <Button onClick={handleSignOut} sx={{ color: 'white' }}>
                  登出
                </Button> */}
              </Box>
            )}
          </Box>
        </Toolbar>
      </CommonWrapper>
    </AppBar>
  );
};

export default ResponsiveAppBar;
