import React, { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import _ from 'lodash';
import { getPatientNameAutoComplete } from '../../services/PatientService';

interface IPatientOption {
  id: string;
  fullName: string;
}

interface IPatientAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const PatientAutocomplete: React.FC<IPatientAutocompleteProps> = ({
  value,
  onChange,
}) => {
  const [options, setOptions] = useState<IPatientOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const fetchPatients = async (searchText: string) => {
    if (!searchText.trim()) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const result = await getPatientNameAutoComplete({
        query: { searchText },
      });
      setOptions(result.patients);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      setOptions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isComposing && value) {
      fetchPatients(value);
    }
  }, [value, isComposing]);

  return (
    <Autocomplete
      freeSolo
      loading={loading}
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.fullName
      }
      inputValue={value}
      onInputChange={(event, newInputValue, reason) => {
        if (reason === 'input' || reason === 'clear') {
          onChange(newInputValue);
        }
      }}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      onChange={(event, newValue) => {
        if (newValue === null) {
          onChange('');
        } else if (typeof newValue === 'string') {
          onChange(newValue);
        } else if ((newValue as any).inputValue) {
          onChange((newValue as any).inputValue);
        } else {
          onChange(newValue ? newValue.fullName : '');
        }
      }}
      filterOptions={(x) => x}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderInput={(params) => (
        <TextField
          {...params}
          label="病患"
          placeholder="請輸入姓名"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default PatientAutocomplete;
