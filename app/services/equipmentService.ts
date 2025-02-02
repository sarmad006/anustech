"use strict";

class EquipmentService {
  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
  }

  async getAll() {
    try {
      const response = await fetch('/api/equipment', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch equipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create equipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating equipment:', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const response = await fetch(`/api/equipment?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update equipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const response = await fetch(`/api/equipment?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete equipment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      throw error;
    }
  }
}

const equipmentService = new EquipmentService();
export default equipmentService; 