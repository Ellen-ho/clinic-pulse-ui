import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/public/containers/signup/SignUp';
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
import AccountManagementPage from './app/private/containers/account/pages/AccountManagementPage';

const App: React.FC = () => {
  const isLoading = useInitAuth();

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
        <Route element={<ConsultationListPage />} path="/consultation" />
        <Route element={<ConsultationDetailPage />} path="/consultation/:id" />
        <Route element={<FeedbackListPage />} path="/feedback" />
        <Route element={<FeedbackDetailPage />} path="/feedback/:id" />
        <Route element={<AccountManagementPage />} path="/account-management" />
        <Route element={<SignUp />} path="/signup" />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<SignIn />} path="/signin" />
      </Route>
      <Route element={<Navigate to="/signin" />} path="/" />
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
