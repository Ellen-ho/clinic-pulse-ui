import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface AvatarUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    setAvatarPath(file ? URL.createObjectURL(file) : null);
  };

  const handleImageSubmit = async () => {
    if (!selectedFile) {
      return null;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.text();
        setAvatarPath(imageUrl);
        onImageUpload(imageUrl);
      } else {
        console.error('Failed to upload avatar.');
      }
    } catch (error) {
      console.error('An error occurred while uploading avatar.', error);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Avatar
        </Button>
      </label>
      {avatarPath && <Avatar src={avatarPath} />}
      {selectedFile && (
        <Button variant="contained" color="primary" onClick={handleImageSubmit}>
          Upload Image
        </Button>
      )}
    </div>
  );
};

export default AvatarUploader;
