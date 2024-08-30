import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { IClinics } from '../../../../../types/Clinics';
import { FiltersContext } from '../../../../../context/FiltersContext';
import _ from 'lodash';
import { RoomNumberType } from '../../../../../types/ConsultationRoom';

interface IRealTimeFiltersProps {
  onApply: (filters: {
    clinicId?: string;
    consultationRoomNumber?: RoomNumberType;
  }) => void;
}

interface IClinic {
  id: string;
  name: string;
}

interface IConsultationRoom {
  label: string;
  value: RoomNumberType;
}

const consultationRoomNumbers = [
  { label: '一診', value: RoomNumberType.ROOM_ONE },
  { label: '二診', value: RoomNumberType.ROOM_TWO },
];

const clinics = [
  { label: '高雄院區', value: 'bf51c88e-9587-479e-994a-d15ec484c333' },
  { label: '台北院區', value: '690d0ea3-9f8d-4143-b160-0661a003bf08' },
  { label: '台中院區', value: '16458ab0-4bb6-4141-9bf0-6d7398942d9b' },
];

const RealTimeFilters: React.FC<IRealTimeFiltersProps> = ({ onApply }) => {
  const [clinicId, setClinicId] = useState<string | undefined>(
    '16458ab0-4bb6-4141-9bf0-6d7398942d9b',
  );
  const [consultationRoomNumber, setConsultationRoomNumber] = useState<
    RoomNumberType | undefined
  >(RoomNumberType.ROOM_ONE);

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
          options={consultationRoomNumbers}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="診間" />}
          onChange={(event, value) =>
            setConsultationRoomNumber(value ? value.value : undefined)
          }
          value={
            consultationRoomNumbers.find(
              (room) => room.value === consultationRoomNumber,
            ) || null
          }
        />
      </Grid>
    </Grid>
  );
};

export default RealTimeFilters;
