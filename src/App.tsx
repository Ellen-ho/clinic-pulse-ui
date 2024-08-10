import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoutes from './app/private/PrivateRoutes';
import Home from './app/public/containers/home/Home';
import SignIn from './app/public/containers/signin/SignIn';
import SignUp from './app/public/containers/signup/SignUp';
import NotFound from './app/public/containers/not-found/NotFound';
import useInitAuth from './hooks/UseInitAuth';
import PublicRoutes from './app/public/PublicRoutes';
import LoadingComponent from './components/loading/Loading';
import Dashboard from './app/private/containers/dashboard/Index';
import ConsultationListPage from './app/private/containers/consultation/pages/ConsultationListPage';
import ConsultationDetailPage from './app/private/containers/consultation/pages/ConsultationDetailPage';
import FeedbackListPage from './app/private/containers/feedback/pages/FeedbackListPage';
import FeedbackDetailPage from './app/private/containers/feedback/pages/FeedbackDetailPage';

const App: React.FC = () => {
  const isLoading = useInitAuth();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<ConsultationListPage />} path="/consultation" />
        <Route element={<ConsultationDetailPage />} path="/consultation/:id" />
        <Route element={<FeedbackListPage />} path="/feedback" />
        <Route element={<FeedbackDetailPage />} path="/feedback/:id" />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />
      </Route>
      <Route element={<Home />} path="/" />
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
