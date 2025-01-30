// client/src/components/TimeChip.jsx

import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function TimeChip({ hour }) {
  const label = `${hour}:00`;

  return (
    <Tooltip title={`Optimal Posting Time: ${label}`} arrow>
      <Chip
        label={label}
        color="primary"
        icon={<AccessTimeIcon />}
        sx={{
          fontWeight: 'bold',
          height: '40px',
          fontSize: '1rem',
          borderRadius: '20px',
        }}
      />
    </Tooltip>
  );
}

export default TimeChip;
