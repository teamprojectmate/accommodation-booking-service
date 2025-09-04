// src/components/StatusBadge.jsx
import React from 'react';
import { mapStatus } from '../utils/translations';

const StatusBadge = ({ status, floating = false }) => {
  const { label, slug } = mapStatus(status);

  return (
    <span className={`badge badge-status-${slug} ${floating ? 'floating' : ''}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
