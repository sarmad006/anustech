'use client'

import React, { useState, useEffect } from 'react';
import InvoiceModal from './InvoiceModal';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      setInvoices(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setIsLoading(false);
    }
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleInvoiceUpdate = (updatedInvoice) => {
    setInvoices(invoices.map(inv => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ));
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleCreateInvoice = async (clientId) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          amount: 0,
          items: [],
        }),
      });

      if (!response.ok) throw new Error('Failed to create invoice');

      const newInvoice = await response.json();
      setInvoices([newInvoice, ...invoices]);
      setSelectedInvoice(newInvoice);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center mt-4">
  <h2 className="text-xl font-semibold text-white">ניהול חשבוניות</h2>
</div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                מספר חשבונית
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                לקוח
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                סכום
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                תאריך הנפקה
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                תאריך תשלום
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                סטטוס
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {invoices.map((invoice) => (
              <tr 
                key={invoice.id} 
                className="hover:bg-gray-800/50 cursor-pointer"
                onClick={() => handleInvoiceClick(invoice)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {invoice.client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₪{invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {new Date(invoice.issueDate).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {new Date(invoice.dueDate).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status === 'paid' ? 'שולם' : 
                     invoice.status === 'pending' ? 'ממתין' : 'באיחור'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-400">
                      צפייה
                    </button>
                    <span>|</span>
                    <button className="text-green-500 hover:text-green-400">
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          client={selectedInvoice.client}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedInvoice(null);
          }}
          onUpdate={handleInvoiceUpdate}
        />
      )}
    </div>
  );
};

export default InvoiceManagement;