import { useState, useEffect } from 'react';
import { 
  fetchPlatforms, 
  fetchActivities, 
  fetchMaintenanceSchedule,
  fetchInvoices,
  fetchDashboardMetrics
} from '../lib/api/fetchers';
import type { 
  Platform, 
  Activity, 
  MaintenanceSchedule, 
  Invoice,
  DashboardMetrics 
} from '../lib/api/types';

export function useDashboardData() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceSchedule[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [
          platformsData,
          activitiesData,
          maintenanceData,
          invoicesData,
          metricsData
        ] = await Promise.all([
          fetchPlatforms(),
          fetchActivities(),
          fetchMaintenanceSchedule(),
          fetchInvoices(),
          fetchDashboardMetrics()
        ]);

        setPlatforms(platformsData);
        setActivities(activitiesData);
        setMaintenance(maintenanceData);
        setInvoices(invoicesData);
        setMetrics(metricsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return {
    platforms,
    activities,
    maintenance,
    invoices,
    metrics,
    loading,
    error,
    // Derived data
    urgentMaintenance: maintenance.filter(m => m.status === 'pending'),
    pendingInvoices: invoices.filter(i => i.status === 'pending'),
    availablePlatforms: platforms.filter(p => p.status === 'available'),
    platformsInMaintenance: platforms.filter(p => p.status === 'maintenance'),
    // Helper functions
    getPlatformById: (id: string) => platforms.find(p => p.id === id),
    getMaintenanceForPlatform: (platformId: string) => 
      maintenance.filter(m => m.platformId === platformId),
    getInvoicesForPlatform: (platformId: string) => 
      invoices.filter(i => i.platformIds.includes(platformId))
  };
}

export default useDashboardData;