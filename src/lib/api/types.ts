// src/lib/api/types.ts
export interface Platform {
  id: string;
  name: string;
  status: 'available' | 'maintenance' | 'rented';
  location?: {
    lat: number;
    lng: number;
  };
  lastMaintenance?: string;
  nextMaintenance?: string;
  currentRental?: {
    customer: string;
    startDate: string;
    endDate: string;
  };
}

export interface Activity {
  id: string;
  type: 'rental' | 'return' | 'maintenance' | 'payment';
  text: string;
  time: string;
  relatedPlatformId?: string;
  amount?: number;
}

export interface MaintenanceSchedule {
  id: string;
  platformId: string;
  type: 'routine' | 'repair';
  scheduledDate: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  platformIds: string[];
}

// src/lib/api/endpoints.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourplatform.com';

export const endpoints = {
  platforms: `${API_BASE_URL}/platforms`,
  activities: `${API_BASE_URL}/activities`,
  maintenance: `${API_BASE_URL}/maintenance`,
  invoices: `${API_BASE_URL}/invoices`,
  metrics: `${API_BASE_URL}/metrics`,
};

// src/lib/api/fetchers.ts
import { Platform, Activity, MaintenanceSchedule, Invoice } from './types';

export async function fetchPlatforms(): Promise<Platform[]> {
  const response = await fetch(endpoints.platforms);
  if (!response.ok) {
    throw new Error('Failed to fetch platforms');
  }
  return response.json();
}

export async function fetchActivities(): Promise<Activity[]> {
  const response = await fetch(endpoints.activities);
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  return response.json();
}

export async function fetchMaintenanceSchedule(): Promise<MaintenanceSchedule[]> {
  const response = await fetch(endpoints.maintenance);
  if (!response.ok) {
    throw new Error('Failed to fetch maintenance schedule');
  }
  return response.json();
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const response = await fetch(endpoints.invoices);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return response.json();
}

// src/lib/api/metrics.ts
export interface DashboardMetrics {
  totalPlatforms: number;
  platformsInMaintenance: number;
  availablePlatforms: number;
  activeProjects: number;
  pendingPayments: number;
  utilizationRate: number;
  customerSatisfaction: number;
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await fetch(endpoints.metrics);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
}