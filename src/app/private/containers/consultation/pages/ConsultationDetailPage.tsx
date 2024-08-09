import React from 'react';
import { Grid } from '@mui/material';
import ConsultationDetail from '../components/ConsultationDetail';
import ConsultationLog from '../components/ConsultationLog';

const ConsultationDetailPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={6}>
        <ConsultationDetail />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ConsultationLog />
      </Grid>
    </Grid>
  );
};

export default ConsultationDetailPage;
