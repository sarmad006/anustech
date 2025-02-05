'use client'

import React, { useState, useEffect,useCallback } from 'react';

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

interface InvoiceData {
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  paymentDate: string;
  status: 'pending' | 'paid';
  clientName: string;
  email: string;
  phone: string;
  _id?:string;
  project:string;
}

interface InvoiceManagementProps {
  invoicesData : InvoiceData[]
  handleView : (invoiceObj:InvoiceData) => void
  handleDelete : (invoiceID:string) => void
}

const InvoiceManagement: React.FC<InvoiceManagementProps> = ({ invoicesData,handleView,handleDelete }) => {




  // const handleDelete = async (invoiceId: string) => {
  //   try {
  //     await InvoiceService.delete(invoiceId);
  //     // After deleting, remove the invoice from the list
  //     setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
  //   } catch (error) {
  //     console.error('Error deleting invoice:', error);
  //   }
  // };
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
            {invoicesData.map((invoice,index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-800/50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {invoice.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ₪{invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {new Date(invoice.issueDate).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {new Date(invoice.paymentDate).toLocaleDateString('he-IL')}
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
                    <button
                      onClick={(e) => handleView(invoice)}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                    >
                    <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    {/* <button onClick={() => handleDelete(invoice._id!)} className="text-red-500 hover:text-red-400">
                      מחיקה
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceManagement;