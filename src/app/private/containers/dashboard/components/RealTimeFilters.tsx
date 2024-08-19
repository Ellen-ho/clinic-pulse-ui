import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { IClinics } from '../../../../../types/Clinics';
import { FiltersContext } from '../../../../../context/FiltersContext';
import _ from 'lodash';

interface IRealTimeFiltersProps {
  onApply: (filters: {
    clinicId?: string;
    consultationRoomNumber?: string;
  }) => void;
}

interface IClinic {
  id: string;
  name: string;
}

interface IConsultationRoom {
  label: string;
  value: string;
}

const consultationRoomNumbers = [
  { label: '台北一診', value: '58602950-b172-45b7-b37c-c8461d73ecf6' },
  { label: '台北二診', value: '15cb95f8-d56d-4721-b32c-74d166ae4a20' },
  { label: '台中一診', value: 'ffeaea79-b30f-4f62-87b4-acee6c747d18' },
  { label: '台中二診', value: 'ed770eec-1c86-4503-84bd-0ac7ea419273' },
  { label: '高雄一診', value: '9e18e1c5-1b63-4ca6-b818-927ae62ae39a' },
  { label: '高雄二診', value: 'a662ecb1-6f06-4b07-9967-95171da4b61f' },
];

const clinics = [
  { label: '高雄院區', value: 'bf51c88e-9587-479e-994a-d15ec484c333' },
  { label: '台北院區', value: '690d0ea3-9f8d-4143-b160-0661a003bf08' },
  { label: '台中院區', value: '16458ab0-4bb6-4141-9bf0-6d7398942d9b' },
];

const RealTimeFilters: React.FC<IRealTimeFiltersProps> = ({ onApply }) => {
  // const { clinics: contextClinics } = useContext(FiltersContext) || {};
  // const [clinics, setClinics] = useState<IClinic[]>([]);
  const [clinicId, setClinicId] = useState<string | undefined>(
    '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
  );
  const [consultationRoomNumber, setConsultationRoomNumber] = useState<
    string | undefined
  >('ffeaea79-b30f-4f62-87b4-acee6c747d18');

  const filteredConsultationRooms = useMemo(() => {
    switch (clinicId) {
      case '16458ab0-4bb6-4141-9bf0-6d7398942d9b':
        return consultationRoomNumbers.filter((room) =>
          [
            'ffeaea79-b30f-4f62-87b4-acee6c747d18',
            'ed770eec-1c86-4503-84bd-0ac7ea419273',
          ].includes(room.value),
        );
      case '690d0ea3-9f8d-4143-b160-0661a003bf08':
        return consultationRoomNumbers.filter((room) =>
          [
            '58602950-b172-45b7-b37c-c8461d73ecf6',
            '15cb95f8-d56d-4721-b32c-74d166ae4a20',
          ].includes(room.value),
        );
      case 'bf51c88e-9587-479e-994a-d15ec484c333':
        return consultationRoomNumbers.filter((room) =>
          [
            '9e18e1c5-1b63-4ca6-b818-927ae62ae39a',
            'a662ecb1-6f06-4b07-9967-95171da4b61f',
          ].includes(room.value),
        );
      default:
        return [];
    }
  }, [clinicId]);

  const handleApplyFilters = () => {
    onApply({
      clinicId,
      consultationRoomNumber,
    });
  };

  useEffect(() => {
    const debouncedFetch = _.debounce(handleApplyFilters, 400);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [clinicId, consultationRoomNumber]);
  // TODO: add the config back later
  // useEffect(() => {
  //   const cachedClinics = localStorage.getItem('clinics');
  //   if (cachedClinics) {
  //     setClinics(JSON.parse(cachedClinics));
  //   } else if (contextClinics && contextClinics.length > 0) {
  //     setClinics(contextClinics);
  //     localStorage.setItem('clinics', JSON.stringify(contextClinics));
  //   }
  // }, [contextClinics]);

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={2}>
        <Autocomplete
          disableClearable={true}
          options={clinics}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="院區" />}
          onChange={(event, value) => {
            setClinicId(value ? value.value : undefined);
            setConsultationRoomNumber(undefined);
          }}
          value={
            clinics.find((clinic) => clinic.value === clinicId) || undefined
          }
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Autocomplete
          options={filteredConsultationRooms}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="診間" />}
          onChange={(event, value) =>
            setConsultationRoomNumber(value ? value.value : undefined)
          }
          value={
            filteredConsultationRooms.find(
              (room) => room.value === consultationRoomNumber,
            ) || null
          }
        />
      </Grid>
    </Grid>
  );
};

export default RealTimeFilters;
