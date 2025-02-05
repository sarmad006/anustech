'use client';

import React, { useState, useEffect } from 'react';
import projectService from '../../services/projectService';

interface Invoice {
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  paymentDate: string;
  status: 'pending' | 'paid';
  project: string;
}

interface Client {
  clientName: string;
  email: string;
  phone: string;
}

interface InvoiceModalProps {
  formData: Invoice & Client;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFormData: (data: Partial<Invoice & Client>) => void;
  setIsModalOpen: () => void;
  isEdit: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  formData,
  handleSubmit,
  setFormData,
  setIsModalOpen,
  isEdit
}) => {
  const [projects, setProjects] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await projectService.getSelected();
        setProjects(projectData);
      } catch (error) {
        console.error('שגיאה באחזור פרויקטים:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-baseline justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-medium text-white mb-4">צור חשבונית</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">פרטי חשבונית</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">מספר חשבונית</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ invoiceNumber: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">סכום</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ amount: Number(e.target.value) })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">תאריך הנפקה</label>
                <input
                  type="date"
                  name="issueDate"
                  value={isEdit && formData.issueDate ? formData.issueDate.split('T')[0] : formData.issueDate}
                  onChange={(e) => setFormData({ issueDate: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">תאריך תשלום</label>
                <input
                  type="date"
                  name="paymentDate"
                  value={isEdit && formData.paymentDate ? formData.paymentDate.split('T')[0] : formData.paymentDate}
                  onChange={(e) => setFormData({ paymentDate: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">סטטוס</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ status: e.target.value as Invoice['status'] })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="pending">ממתין</option>
                  <option value="paid">שולם</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">פרויקט</label>
                <select
                  name="project"
                  value={formData.project}
                  required
                  onChange={(e) => setFormData({ project: e.target.value as Invoice['project'] })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="">נא לבחור</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">פרטי לקוח</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">שם לקוח</label>
                <input
                  type="text"
                  name="clientName"
                  disabled={isEdit}
                  value={formData.clientName}
                  onChange={(e) => setFormData({ clientName: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">אימייל</label>
                <input
                  type="email"
                  name="email"
                  disabled={isEdit}
                  value={formData.email}
                  onChange={(e) => setFormData({ email: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">טלפון</label>
                <input
                  type="text"
                  name="phone"
                  disabled={isEdit}
                  value={formData.phone}
                  onChange={(e) => setFormData({ phone: e.target.value })}
                  className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              שמור חשבונית
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
