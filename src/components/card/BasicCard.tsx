import React from 'react';
import {
  Box,
  Card,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

interface IBasicCardProps {
  startTitleAdornment?: React.ReactNode;
  title?: string;
  titleRightElement?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const BasicCard: React.FC<IBasicCardProps> = ({
  startTitleAdornment,
  title,
  titleRightElement,
  children,
  sx = {},
}) => {
  const showHeader = title || titleRightElement || startTitleAdornment;
  return (
    <Card sx={{ ...sx }}>
      <CardContent>
        {showHeader && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }}
            >
              {startTitleAdornment} {title}
            </Typography>
            {titleRightElement}
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default BasicCard;
