// app/components/dashboard/Reports.tsx
'use client'

import React, { useState, useEffect } from 'react';
import equipmentService from '@/services/equipmentService';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching equipment data...');
        setIsLoading(true);
        setError(null);
        const equipmentData = await equipmentService.getAll();
        console.log('Fetched data:', equipmentData);
        setData(equipmentData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('שגיאה בטעינת הנתונים');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-white text-center p-4">
        טוען נתונים...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <p className="text-red-400">{error}</p>
        <p className="text-gray-300 text-sm mt-2">אנא נסה שוב מאוחר יותר</p>
      </div>
    );
  }

  const statusData = data.reduce((acc, item) => {
    const status = item["Inspection Status"] || 'לא ידוע';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">התפלגות סטטוס במות</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">סיכום נתונים</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-300">סך הכל במות</p>
              <p className="text-2xl font-bold text-white">{data.length}</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-300">במות פעילות</p>
              <p className="text-2xl font-bold text-green-400">
                {data.filter(item => item["Inspection Status"] === "פעיל").length}
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-300">במות בתחזוקה</p>
              <p className="text-2xl font-bold text-yellow-400">
                {data.filter(item => item["Inspection Status"] === "בתחזוקה").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;