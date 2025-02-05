import { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter
} from 'lucide-react';
import projectService from '../../services/projectService';
import { format,parseISO } from "date-fns";


const INITIAL_FORM_DATA = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'pending',
  totalAmount:0
};

const VALID_STATUSES = ['pending', 'in-progress', 'completed'];

const STATUS_ICONS = {
  'Active': <Clock className="w-4 h-4 text-blue-500" />,
  'In Progress': <AlertCircle className="w-4 h-4 text-yellow-500" />,
  'Completed': <CheckCircle2 className="w-4 h-4 text-green-500" />
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showInProgressOnly, setShowInProgressOnly] = useState(false);
  
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      setError('Error loading projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.startDate || !formData.totalAmount) {
      setError('Please fill in all required fields');
      return;
    }
  
    try {
      setIsSaving(true);
      setError(null);
  
      if (editingProject) {
        await projectService.update(editingProject._id, formData);
        setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? formData : p)));
      } else {
        const result = await projectService.create(formData);
        setProjects((prev) => [...prev, result]);
      }
  
      setFormData(INITIAL_FORM_DATA);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };
  

  const handleDelete = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(_id);
      setProjects((prev) => prev.filter((p) => p._id !== _id));
    } catch (err) {
      setError(`Error deleting project: ${err.message}`);
      console.error('Error deleting project:', err);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData(INITIAL_FORM_DATA);
    setIsModalOpen(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredProjects = sortedProjects
    .filter(p => !showInProgressOnly || p.status === 'in-progress')
    .filter(p => 
      Object.values(p).some(value =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
          Add New Project +
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-500 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={fetchProjects}
              className="text-red-200 hover:text-white"
            >
              Try Again
            </button>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pr-8 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
            <Search className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            {/* <Filter className="w-5 h-5 text-gray-400" /> */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showInProgressOnly}
                onChange={(e) => setShowInProgressOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              {/* <span className="ml-3 text-sm font-medium text-gray-300">In Progress Only</span> */}
            </label>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-4 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {['Name', 'Start Date', 'End Date', 'Status', 'Total Amount', 'Actions'].map((header) => (
                  <th
                    key={header}
                    onClick={() => handleSort(header.toLowerCase())}
                    className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase cursor-pointer hover:bg-gray-700/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProjects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {format(parseISO(project.startDate),'dd/MM/yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {format(parseISO(project.endDate),'dd/MM/yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full
                      ${project.status === 'completed' ? 'bg-green-900/50 text-green-200 border border-green-500' : ''}
                      ${project.status === 'pending' ? 'bg-blue-900/50 text-blue-200 border border-blue-500' : ''}
                      ${project.status === 'in-progress' ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-500' : ''}
                    `}>
                      {capitalizeFirstLetter(project.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  <div className="flex items-center gap-2">
                    {project.totalAmount}
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
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
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">שם הפרויקט</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={editingProject ? formData.startDate.split('T')[0] : formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={editingProject ? formData.endDate.split('T')[0] : formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    {VALID_STATUSES.map(status => (
                      <option key={status} value={status}>{capitalizeFirstLetter(status)}</option>
                    ))}
                  </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-300">Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {/* {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} */}
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}