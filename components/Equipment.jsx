import React, { useState, useCallback, useEffect } from 'react';
import equipmentService from '../services/equipmentService';

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await equipmentService.getAll();
      setEquipment(data);
    } catch (error) {
      console.error('❌ Error fetching equipment:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return (
    <div>
      {loading && <div>טוען...</div>}
      {error && <div className="error">שגיאה: {error}</div>}
    </div>
  );
};

export default Equipment; 