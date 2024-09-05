import React from 'react';
import { Grid } from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { NarrowCommonWrapper } from '../../../../layout/CommonWrapper.styled';
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
    navigate(from.pathname + from.search);
  };

  return (
    <PrimaryPageContent>
      <NarrowCommonWrapper>
        <SecondaryPageTop onBack={handleBack} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <ReviewDetail />
          </Grid>
        </Grid>
      </NarrowCommonWrapper>
    </PrimaryPageContent>
  );
};

export default ReviewDetailPage;
