'use client';

import { useState, useEffect, useCallback } from 'react';
import equipmentService from '../../services/equipmentService';

const VALID_STATUSES = ['פעיל', 'בתחזוקה', 'לא פעיל'];

const INITIAL_FORM_DATA = {
  modelNumber: '',
  licenseNumber: '',
  lastMaintenance: '',
  nextMaintenance: '',
  status: 'פעיל',
  location: '',
  notes: '',
};

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState({});

  // Fetch equipment data
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await equipmentService.getAll();
      setEquipment(data);
    } catch (err) {
      setError('שגיאה בטעינת הנתונים');
      console.error('Error fetching equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Submitting form data:', formData);
      
      const result = await equipmentService.create(formData);
      console.log('Equipment saved:', result);
      
      setEquipment(prev => [...prev, result]);
      setFormData(INITIAL_FORM_DATA);
      alert('הציוד נוסף בהצלחה');
    } catch (err) {
      console.error('Error saving equipment:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) return;

    try {
      const response = await equipmentService.delete(_id);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json(); // Consume the response
      setEquipment((prev) => prev.filter((item) => item._id !== _id));
      alert('הפריט נמחק בהצלחה');
    } catch (err) {
      setError(`שגיאה במחיקת הפריט: ${err.message}`);
      console.error('Error deleting equipment:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingEquipment(item);
    setFormData({
      ...item,
      lastMaintenance: item.lastMaintenance ? item.lastMaintenance.split('T')[0] : '',
      nextMaintenance: item.nextMaintenance ? item.nextMaintenance.split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingEquipment(null);
    setFormData(INITIAL_FORM_DATA);
    setIsModalOpen(true);
  };

  const filteredEquipment = equipment.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_FORM_DATA);
    setFormErrors({});
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end items-center w-full">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          הוסף במת הרמה חדשה +
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-500 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={fetchEquipment}
              className="text-red-200 hover:text-white"
            >
              נסה שוב
            </button>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mt-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pr-8 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
          />
          <svg
            className="absolute left-2 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="mt-4 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  מספר מודל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  מספר רישוי
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  טיפול אחרון
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  טיפול הבא
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  מיקום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredEquipment.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {item.modelNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {item.licenseNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {item.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {item.nextMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${item.status === 'פעיל'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-500 ml-3"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-medium text-white mb-4">
              {editingEquipment ? 'עריכת במת הרמה' : 'הוספת במת הרמה חדשה'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">מספר מודל</label>
                  <input
                    type="text"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.modelNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {formErrors.modelNumber && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.modelNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">מספר רישוי</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.licenseNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {formErrors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.licenseNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">טיפול אחרון</label>
                  <input
                    type="date"
                    name="lastMaintenance"
                    value={formData.lastMaintenance}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.lastMaintenance ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {formErrors.lastMaintenance && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.lastMaintenance}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">טיפול הבא</label>
                  <input
                    type="date"
                    name="nextMaintenance"
                    value={formData.nextMaintenance}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.nextMaintenance ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {formErrors.nextMaintenance && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.nextMaintenance}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">סטטוס</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.status ? 'border-red-500' : 'border-gray-600'
                    }`}
                  >
                    {VALID_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {formErrors.status && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.status}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">מיקום</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`mt-1 w-full p-2 bg-gray-700 border rounded-md text-white ${
                      formErrors.location ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {formErrors.location && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">הערות</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  disabled={isSaving}
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      שומר...
                    </>
                  ) : (
                    editingEquipment ? 'שמור שינויים' : 'הוסף במת הרמה'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}