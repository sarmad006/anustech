class EquipmentService {
  async getAll() {
    try {
      console.log('🔄 Fetching equipment...');
      const response = await fetch('/api/equipment');
      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        if (!response.ok) {
          console.error('❌ Server error:', data);
          throw new Error(data.error || 'Failed to fetch equipment');
        }
        console.log('✅ Equipment fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ Error parsing response:', text);
        throw new Error('שגיאה בטעינת הנתונים');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      throw error;
    }
  }

  async create(equipment) {
    try {
      console.log('🔄 Creating equipment:', equipment);
      const response = await fetch('/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipment),
      });

      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        if (!response.ok) {
          console.error('❌ Server error:', data);
          throw new Error(data.error || 'Failed to create equipment');
        }
        console.log('✅ Equipment created successfully:', data);
        return data;
      } catch (error) {
        console.error('❌ Error parsing response:', text);
        throw new Error('שגיאה בשמירת הציוד');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      throw error;
    }
  }
}

export default new EquipmentService(); 