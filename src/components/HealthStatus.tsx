// src/components/HealthStatus.tsx
import React from 'react';
import { getHealthStatusBadgeColor } from '../utils/formatters';

interface HealthStatusProps {
  status: string;
}

export const HealthStatus: React.FC<HealthStatusProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getHealthStatusBadgeColor(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
