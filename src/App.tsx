import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/private/containers/signup/SignUp';
import NotFound from './app/public/containers/not-found/NotFound';
import useInitAuth from './hooks/UseInitAuth';
import PublicRoutes from './app/public/PublicRoutes';
import LoadingComponent from './components/loading/Loading';
import ConsultationListPage from './app/private/containers/consultation/pages/ConsultationListPage';
import ConsultationDetailPage from './app/private/containers/consultation/pages/ConsultationDetailPage';
import FeedbackListPage from './app/private/containers/feedback/pages/FeedbackListPage';
import FeedbackDetailPage from './app/private/containers/feedback/pages/FeedbackDetailPage';
import ConsultationReportPage from './app/private/containers/report/pages/ConsultationReportPage';
import DashboardPage from './app/private/containers/dashboard/pages/DashboardPage';
import FeedbackReportPage from './app/private/containers/report/pages/FeedbackReportPage';
import useSocketNotification from './hooks/UseSocketNotification';
import ReviewListPage from './app/private/containers/review/pages/ReviewListPage';
import ReviewDetailPage from './app/private/containers/review/pages/ReviewDetailPage';
import Notification from './app/private/containers/notification/Index';
import DoctorProfileDetail from './app/private/containers/profile/pages/DoctorProfileDetail';
import Calendar from './app/private/containers/time-slot/components/TimeSlotCalendar';
import TimeSlotPage from './app/private/containers/time-slot/pages/TimeSlotPage';
import TimeSlot from './app/private/containers/time-slot';
import Review from './app/private/containers/review';
import Profile from './app/private/containers/profile/Index';
import { Feedback } from '@mui/icons-material';
import Consultation from './app/private/containers/consultation';
import HomeLanding from './app/public/containers/home/page/HomeLanding';
import MailForReset from './app/public/containers/resetPassword/pages/MailForReset';
import PasswordReset from './app/public/containers/resetPassword/pages/PasswordReset';
import ReviewReportPage from './app/private/containers/report/pages/ReviewReportPage';

const App: React.FC = () => {
  const isLoading = useInitAuth();
  useSocketNotification();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route
          element={<ConsultationReportPage />}
          path="/consultation-report-center"
        />
        <Route
          element={<FeedbackReportPage />}
          path="/feedback-report-center"
        />
        <Route element={<ReviewReportPage />} path="/review-report-center" />
        <Route element={<Consultation />} path="/consultation/*" />
        <Route element={<FeedbackListPage />} path="/feedback" />
        <Route element={<FeedbackDetailPage />} path="/feedback/:id" />
        <Route element={<Review />} path="/review/*" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<TimeSlot />} path="/time-slot" />
        <Route element={<Notification />} path="/notification/*" />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<MailForReset />} path="/input-email" />
        <Route element={<PasswordReset />} path="/reset-password" />
      </Route>
      {/* <Route element={<Navigate to="/signin" />} path="/" /> */}
      <Route element={<HomeLanding />} path="/" />
      <Route element={<NotFound />} path="" />
    </Routes>
  );
};

export default App;

const DebugRouter = ({ children }: { children: any }) => {
  const location = useLocation();

  console.log(
    `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
      location.state,
    )}`,
  );

  return children;
};
