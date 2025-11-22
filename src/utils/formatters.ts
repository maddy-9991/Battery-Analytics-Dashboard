// src/utils/formatters.ts
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getHealthStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    excellent: 'text-green-500',
    good: 'text-blue-500',
    fair: 'text-yellow-500',
    poor: 'text-orange-500',
    critical: 'text-red-500',
  };
  return colors[status] || 'text-gray-500';
};

export const getHealthStatusBadgeColor = (status: string): string => {
  const colors: Record<string, string> = {
    excellent: 'bg-green-500/20 text-green-400 border-green-500/50',
    good: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    fair: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    poor: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    critical: 'bg-red-500/20 text-red-400 border-red-500/50',
  };
  return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/50';
};
