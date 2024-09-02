import React, { useState } from 'react';
import { TextField, Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EditableTypographyProps {
  value: string;
  onSave: (newValue: string) => void;
}

const EditableTypography: React.FC<EditableTypographyProps> = ({
  value,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value);
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <TextField
        size="small"
        variant="outlined"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        autoFocus
      />
      <IconButton onClick={handleSave}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={handleCancel}>
        <CloseIcon />
      </IconButton>
    </div>
  ) : (
    <Typography variant="body1" onClick={handleEdit} sx={{ cursor: 'pointer' }}>
      {value}
    </Typography>
  );
};

export default EditableTypography;
