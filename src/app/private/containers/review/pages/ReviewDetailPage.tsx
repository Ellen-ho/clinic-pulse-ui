import React from 'react';
import { Grid } from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewDetail from '../component/ReviewDetail';

const ReviewDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: '/review', search: '' },
  };

  const handleBack = () => {
    console.log('Navigating back to:', from.pathname + from.search);
    navigate(from.pathname + from.search);
  };

  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop onBack={handleBack} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <ReviewDetail />
          </Grid>
          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ReviewDetailPage;
