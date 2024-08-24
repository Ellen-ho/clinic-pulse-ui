import { Avatar, SxProps, Theme } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import React from 'react';

interface IImageAvatarProps {
  imageUrl?: string | null;
  sx?: SxProps<Theme>;
}

const ImageAvatar: React.FC<IImageAvatarProps> = ({ imageUrl, sx }) => {
  return (
    <Avatar
      sx={{
        width: 35,
        height: 35,
        ...sx,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <AccountCircleRoundedIcon />
      )}
    </Avatar>
  );
};

export default ImageAvatar;
