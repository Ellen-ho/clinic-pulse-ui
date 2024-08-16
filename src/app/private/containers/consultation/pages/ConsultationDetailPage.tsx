import React from 'react';
import { Grid } from '@mui/material';
import ConsultationDetail from '../components/ConsultationDetail';
import ConsultationLog from '../components/ConsultationLog';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import { CommonWrapper } from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';

const ConsultationDetailPage: React.FC = () => {
  return (
    <PrimaryPageContent>
      <CommonWrapper>
        <SecondaryPageTop />
        <Grid container spacing={1} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} lg={7}>
            <ConsultationDetail />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <ConsultationLog />
          </Grid>
        </Grid>
      </CommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationDetailPage;
