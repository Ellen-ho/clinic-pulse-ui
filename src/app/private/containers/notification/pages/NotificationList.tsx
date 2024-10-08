import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import PrimaryPageTop from '../../../../layout/PrimaryPageTop';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  CommonWrapper,
  NarrowCommonWrapper,
} from '../../../../layout/CommonWrapper.styled';
import { dateFormatter } from '../../../../../utils/dateFormatter';
import useSWR from 'swr';
import {
  deleteAllNotifications,
  deleteNotification,
  getNotificationDetails,
  getNotificationList,
  readAllNotifications,
} from '../../../../../services/NotificationService';
import React, { useContext, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoDataFound from '../../../../../components/signs/NoDataFound';
import { NotificationContext } from '../../../../../context/NotificationContext';
import NotificationIcons from '../components/NotificationIcons';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../../../../types/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import DataLoading from '../../../../../components/signs/DataLoading';

const NotificationList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { state, dispatch } = useContext(NotificationContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };
  const { data, isLoading, mutate } = useSWR(`getNotifications?q=${page}`, () =>
    getNotificationList({
      query: {
        limit: 10,
        page: page,
      },
    }),
  );

  const resetUnreadNotification = () => {
    dispatch({
      type: 'UPDATE_NOTIFICATION',
      payload: {
        hasUnread: false,
      },
    });
  };

  const handleReadAll = async () => {
    handleCloseMenu();
    await readAllNotifications();
    mutate();

    resetUnreadNotification();
  };

  const handleDeleteAll = async () => {
    handleCloseMenu();
    await deleteAllNotifications();
    mutate();

    resetUnreadNotification();
  };

  const handleDeleteNotification = async (notificationId: string) => {
    await deleteNotification({ notificationId });
    await mutate();
  };

  const handleClickNotification = async (
    notificationId: string,
    notificationType: NotificationType,
    referenceId: string | null,
  ) => {
    if (!referenceId) {
      return;
    }
    await getNotificationDetails({ notificationId });
    mutate();
    switch (notificationType) {
      case NotificationType.NEGATIVE_FEEDBACK:
        navigate(`/feedback/${referenceId}`);
        break;
      case NotificationType.NEGATIVE_REVIEW:
        navigate(`/review/${referenceId}`);
        break;
      case NotificationType.ONSITE_CANCELLATION:
      case NotificationType.ABNORMAL_CONSULTATION_WAIT_TIME:
      case NotificationType.ABNORMAL_BED_WAIT_TIME:
      case NotificationType.ABNORMAL_ACUPUNCTURE_WAIT_TIME:
      case NotificationType.ABNORMAL_NEEDLE_REMOVAL_WAIT_TIME:
      case NotificationType.ABNORMAL_MEDICATION_WAIT_TIME:
        navigate(`/consultation/${referenceId}`);
        break;
    }
  };

  return (
    <PrimaryPageContent>
      <NarrowCommonWrapper>
        <PrimaryPageTop pageTitle={'通知列表'} />
        <Card>
          <CardContent
            sx={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <Box textAlign={'right'}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleReadAll}>
                  <Typography textAlign="center">讀取全部</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteAll}>
                  <Typography textAlign="center">刪除全部</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {data?.data && data?.data.length > 0 ? (
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                {data?.data.map((notification) => (
                  <>
                    <Box
                      key={notification.id}
                      display="flex"
                      alignItems="center"
                    >
                      <ListItemButton
                        key={notification.id}
                        onClick={() =>
                          handleClickNotification(
                            notification.id,
                            notification.notificationType,
                            notification.referenceId,
                          )
                        }
                        sx={{
                          backgroundColor: notification.isRead
                            ? '#fff'
                            : '#e0f5ff',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <NotificationIcons
                              notificationType={notification.notificationType}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={notification.title}
                          secondary={`${dateFormatter(
                            notification.createdAt.toString(),
                          )}`}
                        />
                      </ListItemButton>
                      <Tooltip title={'Delete'} placement="top">
                        <IconButton
                          color={'warning'}
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Divider />
                    </Box>
                  </>
                ))}
              </List>
            ) : (
              <Box sx={{ position: 'relative', minHeight: '200px' }}>
                {isLoading ? (
                  <DataLoading />
                ) : (
                  <NoDataFound label="目前沒有通知訊息" />
                )}
              </Box>
            )}
          </CardContent>
        </Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Pagination
            count={data?.pagination.totalPage || 1}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
          />
        </div>
      </NarrowCommonWrapper>
    </PrimaryPageContent>
  );
};

export default NotificationList;
