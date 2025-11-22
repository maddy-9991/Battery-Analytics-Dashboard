// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { Battery, Zap, ThermometerSun, Activity, RefreshCw } from 'lucide-react';
import { useBatteryMetrics } from '../hooks/useBatteryMetrics';
import { MetricCard } from '../components/MetricCard';
import { HealthStatus } from '../components/HealthStatus';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { FileUpload } from '../components/FileUpload';
import { MetricsChart } from '../components/MetricsChart';
import { formatPercentage, formatNumber, formatDate } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const [batteryId, setBatteryId] = useState('battery-001');
  const { metrics, loading, error, refresh } = useBatteryMetrics(batteryId);

  // Sample chart data
  const chartData = [
    { name: 'Jan', SOH: 98, SOC: 85 },
    { name: 'Feb', SOH: 97, SOC: 82 },
    { name: 'Mar', SOH: 96, SOC: 88 },
    { name: 'Apr', SOH: 95, SOC: 78 },
    { name: 'May', SOH: 94.5, SOC: 75 },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!metrics) return <ErrorMessage message="No data available" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Battery Analytics Dashboard
            </h1>
            <p className="text-slate-400">
              Real-time monitoring and analytics for BESS
            </p>
          </div>
          <button
            onClick={refresh}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Battery Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Battery ID
        </label>
        <input
          type="text"
          value={batteryId}
          onChange={(e) => setBatteryId(e.target.value)}
          className="input max-w-xs"
          placeholder="Enter battery ID"
        />
      </div>

      {/* Status Card */}
      <div className="mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {metrics.battery_id}
              </h2>
              <p className="text-sm text-slate-400">
                Last updated: {formatDate(metrics.timestamp)}
              </p>
            </div>
            <HealthStatus status={metrics.health_status} />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="State of Health"
          value={formatPercentage(metrics.soh)}
          icon={<Battery size={32} />}
          trend={metrics.soh > 95 ? 'up' : 'down'}
          trendValue={`${formatNumber(metrics.degradation_rate)}% per month`}
        />
        <MetricCard
          title="State of Charge"
          value={formatPercentage(metrics.current_soc)}
          icon={<Zap size={32} />}
        />
        <MetricCard
          title="Temperature"
          value={formatNumber(metrics.avg_temperature, 1)}
          unit="°C"
          icon={<ThermometerSun size={32} />}
        />
        <MetricCard
          title="Full Cycles"
          value={metrics.full_cycles}
          icon={<Activity size={32} />}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Average Voltage"
          value={formatNumber(metrics.avg_voltage, 1)}
          unit="V"
        />
        <MetricCard
          title="Average Current"
          value={formatNumber(metrics.avg_current, 1)}
          unit="A"
        />
        <MetricCard
          title="Degradation Rate"
          value={formatNumber(metrics.degradation_rate, 2)}
          unit="% / month"
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="mb-8">
        <MetricsChart
          data={chartData}
          dataKeys={['SOH', 'SOC']}
          title="Battery Health Trend"
        />
      </div>

      {/* File Upload */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Upload Battery Data
        </h2>
        <FileUpload
          onUploadComplete={(result) => {
            alert(`Processed ${result.records_processed} records successfully!`);
            refresh();
          }}
        />
      </div>
    </div>
  );
};
