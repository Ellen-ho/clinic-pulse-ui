import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ConsultationDetail from '../components/ConsultationDetail';
import ConsultationLog from '../components/ConsultationLog';
import PrimaryPageContent from '../../../../layout/PrimaryPageContent';
import {
  CommonWrapper,
  NarrowCommonWrapper,
} from '../../../../layout/CommonWrapper.styled';
import SecondaryPageTop from '../../../../layout/SecondaryPageTop';
import { useLocation, useNavigate } from 'react-router-dom';

const ConsultationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || {
    from: { pathname: '/consultation', search: '' },
  };

  const handleBack = () => {
    navigate(from.pathname + from.search);
  };

  return (
    <PrimaryPageContent>
      <NarrowCommonWrapper>
        <SecondaryPageTop onBack={handleBack} />
        <Grid container spacing={1} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} lg={7}>
            <ConsultationDetail />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <ConsultationLog />
          </Grid>
        </Grid>
      </NarrowCommonWrapper>
    </PrimaryPageContent>
  );
};

export default ConsultationDetailPage;
