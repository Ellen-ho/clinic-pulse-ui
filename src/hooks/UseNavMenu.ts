import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IPermission } from '../types/Users';

interface IPageItem {
  title: string;
  link: string;
  permission?: string;
  subMenu?: IPageItem[];
}

export interface IPage extends IPageItem {
  subMenu?: IPageItem[];
}

const pages: IPage[] = [
  {
    title: '即時看板',
    link: '/dashboard',
    permission: 'dashboardRead',
  },
  {
    title: '看診紀錄',
    link: '/consultation',
    permission: 'consultationRead',
  },
  {
    title: '反饋紀錄',
    link: '',
    subMenu: [
      {
        title: '問券反饋',
        link: '/feedback',
        permission: 'feedbackSurveyRead',
      },
      {
        title: 'Google評論',
        link: '/review',
        permission: 'onlineReviewRead',
      },
    ],
  },
  {
    title: '統計中心',
    link: '',
    subMenu: [
      {
        title: '門診統計中心',
        link: '/consultation-report-center',
        permission: 'reportCenterRead',
      },
      {
        title: '反饋統計中心',
        link: '/feedback-report-center',
        permission: 'feedbackSurveyRead',
      },
      {
        title: 'Google評論統計中心',
        link: '/review-report-center',
        permission: 'onlineReviewRead',
      },
    ],
  },
  {
    title: '門診表',
    link: '/time-slot',
    permission: 'timeSlotRead',
  },
  {
    title: '人員註冊',
    link: '/signup',
    permission: 'staffManagementEdit',
  },
  {
    title: '個人中心',
    link: '/profile',
    permission: 'profileRead',
  },
];

const useNavMenu = () => {
  const { state } = useContext(AuthContext);
  const permissionMap = state.permissions as IPermission;
  const isSignedIn = state.isSignedIn;

  const filterMenu = (menu: IPageItem[]): IPageItem[] => {
    return menu
      .filter((page) => !page.permission || permissionMap[page.permission])
      .map((page) => {
        if (page.subMenu) {
          return { ...page, subMenu: filterMenu(page.subMenu) };
        }
        return page;
      });
  };

  const filteredMenu = isSignedIn ? filterMenu(pages) : [];

  return {
    menu: filteredMenu,
  };
};

export default useNavMenu;
