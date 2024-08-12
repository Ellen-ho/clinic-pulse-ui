import React from 'react';
import { Grid } from '@mui/material';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import FeedbackDetail from '../components/FeedbackDetail';

const FeedbackDetailPage: React.FC = () => {
  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
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
