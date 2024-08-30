import React from 'react';
import { Grid } from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import FeedbackDetail from '../components/FeedbackDetail';
import { useLocation, useNavigate } from 'react-router-dom';

const FeedbackDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: '/feedback', search: '' },
  };

  const handleBack = () => {
    navigate(from.pathname + from.search);
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop onBack={handleBack} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <FeedbackDetail />
          </Grid>
          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default FeedbackDetailPage;
