// src/types/index.ts
export interface BatteryMetrics {
  battery_id: string;
  timestamp: string;
  soh: number;
  current_soc: number;
  avg_voltage: number;
  avg_current: number;
  avg_temperature: number;
  full_cycles: number;
  degradation_rate: number;
  health_status: string;
}

export interface ProcessDataResponse {
  status: string;
  records_processed: number;
  metrics: Record<string, any>;
  message: string;
}

export interface AnomalyDetectionRequest {
  battery_id: string;
  data: Array<Record<string, any>>;
  contamination?: number;
  thresholds?: Record<string, [number, number]>;
}

export interface AnomalyDetectionResponse {
  battery_id: string;
  anomaly_count: number;
  anomaly_percentage: number;
  anomalies: Array<Record<string, any>>;
  summary: Record<string, any>;
}

export interface SystemStatus {
  status: string;
  version: string;
  features: {
    metrics_calculation: boolean;
    anomaly_detection: boolean;
    data_processing: boolean;
  };
}

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
