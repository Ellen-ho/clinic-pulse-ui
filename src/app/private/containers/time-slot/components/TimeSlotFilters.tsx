import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../../../../../context/FiltersContext';
import { IClinics } from '../../../../../types/Clinics';
import { getClinicsFromCache } from '../../../../../utils/getClinicsFromCache';
import { Autocomplete, Grid, TextField } from '@mui/material';
import _ from 'lodash';
import { AuthContext } from '../../../../../context/AuthContext';

interface ITimeSlotFiltersProps {
  onApply: (filters: { clinicId?: string; doctorId?: string }) => void;
}

const TimeSlotFilters: React.FC<ITimeSlotFiltersProps> = ({ onApply }) => {
  const { state } = useContext(AuthContext);
  const isDoctor = state.doctorId != null;
  const { clinics: contextClinics } = useContext(FiltersContext) || {};
  const [clinics, setClinics] = useState<IClinics[]>([]);
  const [clinicId, setClinicId] = useState<string | undefined>(
    '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
  );

  const handleApplyFilters = () => {
    const filters = {
      clinicId,
    };
    onApply(filters);
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(handleApplyFilters, 400);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [clinicId]);

  useEffect(() => {
    const cachedClinics = getClinicsFromCache();

    if (
      cachedClinics &&
      Array.isArray(cachedClinics) &&
      cachedClinics.length > 0
    ) {
      setClinics(cachedClinics);
    } else if (contextClinics && contextClinics.length > 0) {
      setClinics(contextClinics);
      localStorage.setItem('clinics', JSON.stringify(contextClinics));
    }
  }, [contextClinics]);

  return (
    <Grid container spacing={1} alignItems="center">
      {!isDoctor && (
        <Grid item xs={12} sm={2}>
          <Autocomplete
            options={clinics}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="院區" />}
            onChange={(event, value) =>
              setClinicId(value ? value.id : undefined)
            }
            value={clinics.find((clinic) => clinic.id === clinicId) || null}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TimeSlotFilters;
