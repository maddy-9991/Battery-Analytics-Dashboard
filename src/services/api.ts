// src/services/api.ts
import axios, { AxiosInstance } from 'axios';
import type {
  BatteryMetrics,
  ProcessDataResponse,
  AnomalyDetectionRequest,
  AnomalyDetectionResponse,
  SystemStatus,
} from '../types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; service: string }> {
    const response = await this.client.get('/health');
    return response.data;
  }

  // Get system status
  async getSystemStatus(): Promise<SystemStatus> {
    const response = await this.client.get('/api/v1/status');
    return response.data;
  }

  // Get battery metrics
  async getBatteryMetrics(
    batteryId: string,
    startDate?: string,
    endDate?: string
  ): Promise<BatteryMetrics> {
    const params: Record<string, string> = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    const response = await this.client.get(`/api/v1/metrics/${batteryId}`, {
      params,
    });
    return response.data;
  }

  // Process battery data file
  async processData(file: File): Promise<ProcessDataResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post('/api/v1/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Detect anomalies
  async detectAnomalies(
    request: AnomalyDetectionRequest
  ): Promise<AnomalyDetectionResponse> {
    const response = await this.client.post('/api/v1/anomalies/detect', request);
    return response.data;
  }
}

export const apiService = new ApiService();
