import React, { useState } from 'react';
import { Box, Button, CircularProgress, Container, Input } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import LoadingButton from '@mui/lab/LoadingButton';
import { uploadAvatar } from '../../services/DoctorService';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  id: string;
}

const ImageUploadComponent: React.FC<ImageUploadProps> = ({
  onImageUpload,
  id,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (newFile: File | null) => {
    setSelectedFile(newFile);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      try {
        const response = await uploadAvatar(selectedFile, id);
        setImageUrl(response.imageUrl);
        onImageUpload(response.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <MuiFileInput
        value={selectedFile}
        onChange={handleFileChange}
        placeholder="點擊上傳相片"
        inputProps={{ accept: 'image/*' }}
        sx={{ border: '1px dashed #ccc', width: '100%' }}
      />
      {/* <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleFileChange}
      /> */}
      {/* <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
      >
        Upload
      </Button> */}
      <LoadingButton
        onClick={handleUpload}
        loading={loading}
        disabled={!selectedFile || loading}
      >
        上傳更新
      </LoadingButton>
      {/* {loading && <CircularProgress />}
      {imageUrl && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )} */}
    </Box>
  );
};

export default ImageUploadComponent;
