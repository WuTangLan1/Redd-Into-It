// client/src/components/TimeChip.jsx

import React from 'react';
import { Chip } from '@mui/material';

function TimeChip({ hour }) {
  const label = `${hour}:00`;

  return <Chip label={label} color="primary" />;
}

export default TimeChip;
