// client/src/components/TimeChip.jsx

import React from 'react';
import { Chip, Tooltip, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  height: '40px',
  fontSize: '1rem',
  borderRadius: '20px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

function TimeChip({ hour }) {
  const theme = useTheme();
  const label = `${hour}:00`;

  return (
    <Tooltip title={`Optimal Posting Time: ${label}`} arrow>
      <StyledChip
        label={label}
        color="primary"
        icon={<AccessTimeIcon />}
        aria-label={`Optimal Posting Time: ${label}`}
        sx={{
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        }}
      />
    </Tooltip>
  );
}

export default TimeChip;
