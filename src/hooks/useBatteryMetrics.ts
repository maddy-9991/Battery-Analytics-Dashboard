// src/hooks/useBatteryMetrics.ts
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { BatteryMetrics } from '../types';

export const useBatteryMetrics = (batteryId: string) => {
  const [metrics, setMetrics] = useState<BatteryMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBatteryMetrics(batteryId);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setLoading(false);
        console.log(1)
      }
    };

    if (batteryId) {
      fetchMetrics();
    }
  }, [batteryId]);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBatteryMetrics(batteryId);
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh metrics');
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error, refresh };
};
