import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
} from '@mui/material';
import ImageAvatar from '../../../../../components/avatar/ImageAvatar';
import ImageUploadComponent from '../../../../../components/form/ImageUploadComponent';

interface AvatarUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onImageUpload: (imageUrl: string) => void;
  id: string;
}

const AvatarUploadDialog: React.FC<AvatarUploadDialogProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onImageUpload,
  id,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl);

  const handlePreviewImage = (newPreviewUrl: string) => {
    setPreviewUrl(newPreviewUrl);
  };

  const handleConfirmUpload = async (uploadedImageUrl: string) => {
    onImageUpload(uploadedImageUrl);
    setPreviewUrl(uploadedImageUrl);
    onClose();
  };

  const handleCloseDialog = () => {
    setPreviewUrl(imageUrl);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
      <DialogTitle>編輯相片</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ImageAvatar
            imageUrl={previewUrl}
            sx={{
              width: 150,
              height: 150,
              mb: '1rem',
            }}
          />
          <Divider />
          <ImageUploadComponent
            onImageUpload={handleConfirmUpload}
            onPreview={handlePreviewImage}
            id={id}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>取消</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarUploadDialog;
