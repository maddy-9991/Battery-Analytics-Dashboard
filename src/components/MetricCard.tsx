// src/components/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold text-white">
              {value}
              {unit && <span className="text-xl text-slate-400 ml-1">{unit}</span>}
            </p>
          </div>
          {trendValue && (
            <p className={`mt-2 text-sm ${getTrendColor()}`}>
              {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-primary-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
