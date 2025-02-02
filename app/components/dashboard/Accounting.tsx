'use client'

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import InvoiceManagement from './InvoiceManagement';


const Accounting = () => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState(null);

  const clients = [
    {
      id: 1,
      name: 'חברה א׳',
      contactName: 'ישראל ישראלי',
      phone: '050-1234567',
      email: 'israel@company-a.co.il',
      totalBilled: 45000,
      outstandingBalance: 12000,
      lastActivity: '2024-01-20',
      status: 'active',
      projects: [
        { id: 'P001', name: 'פרויקט בניה תל אביב', status: 'active', value: 25000 },
        { id: 'P002', name: 'פרויקט שיפוץ חיפה', status: 'completed', value: 20000 }
      ],
      recentInvoices: [
        { id: 'INV-001', date: '2024-01-15', amount: 8500, status: 'paid' },
        { id: 'INV-002', date: '2024-01-20', amount: 12000, status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'חברה ב׳',
      contactName: 'יעקב יעקובי',
      phone: '050-7654321',
      email: 'yaakov@company-b.co.il',
      totalBilled: 35000,
      outstandingBalance: 8000,
      lastActivity: '2024-01-18',
      status: 'active',
      projects: [
        { id: 'P003', name: 'פרויקט בניה ירושלים', status: 'active', value: 35000 }
      ],
      recentInvoices: [
        { id: 'INV-003', date: '2024-01-10', amount: 15000, status: 'paid' }
      ]
    }
  ];

  const invoices = [
    { id: 'INV-2024-001', customer: 'חברה א׳', amount: 12450, status: 'pending', date: '2024-01-15' },
    { id: 'INV-2024-002', customer: 'חברה ב׳', amount: 8500, status: 'paid', date: '2024-01-18' },
    { id: 'INV-2024-003', customer: 'חברה ג׳', amount: 15000, status: 'overdue', date: '2024-01-10' },
    { id: 'INV-2024-004', customer: 'חברה ד׳', amount: 9200, status: 'pending', date: '2024-01-20' }
  ];

  const financialSummary = {
    totalRevenue: 245000,
    pendingPayments: 45650,
    overduePayments: 15000,
    monthlyGrowth: 12.5
  };

  const filteredClients = clients.filter(client =>
    client.name.includes(searchQuery) || 
    client.contactName.includes(searchQuery) ||
    client.phone.includes(searchQuery)
  );

  const handleSave = async () => {
    setSelectedClient(editedClient);
    setIsEditing(false);
  };

  const handleFieldClick = () => {
    if (!isEditing) {
      // נוודא שכל השדות קיימים ב-editedClient
      setEditedClient({
        ...selectedClient,
        name: selectedClient.name || '',
        contactName: selectedClient.contactName || '',
        phone: selectedClient.phone || '',
        email: selectedClient.email || '',
        totalBilled: selectedClient.totalBilled || 0,
        outstandingBalance: selectedClient.outstandingBalance || 0,
        lastActivity: selectedClient.lastActivity || '',
        status: selectedClient.status || '',
        projects: selectedClient.projects || [],
        recentInvoices: selectedClient.recentInvoices || []
      });
      setIsEditing(true);
    }
  };

  const renderFinancialSummary = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
        <h4 className="text-sm font-medium text-gray-400">סה״כ הכנסות</h4>
        <div className="mt-2">
          <span className="text-2xl font-bold text-white">₪{financialSummary.totalRevenue.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
        <h4 className="text-sm font-medium text-gray-400">תשלומים בהמתנה</h4>
        <div className="mt-2">
          <span className="text-2xl font-bold text-yellow-500">₪{financialSummary.pendingPayments.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
        <h4 className="text-sm font-medium text-gray-400">תשלומים באיחור</h4>
        <div className="mt-2">
          <span className="text-2xl font-bold text-red-500">₪{financialSummary.overduePayments.toLocaleString()}</span>
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
        <h4 className="text-sm font-medium text-gray-400">צמיחה חודשית</h4>
        <div className="mt-2">
          <span className="text-2xl font-bold text-green-500">{financialSummary.monthlyGrowth}%</span>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-4 rtl:space-x-reverse" aria-label="Tabs">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`${
            activeTab === 'invoices'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
          } py-2 px-1 border-b-2 font-medium text-sm`}
        >
          חשבוניות
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`${
            activeTab === 'reports'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
          } py-2 px-1 border-b-2 font-medium text-sm`}
        >
          דוחות פיננסיים
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`${
            activeTab === 'clients'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
          } py-2 px-1 border-b-2 font-medium text-sm`}
        >
          תיקי לקוחות
        </button>
      </nav>
    </div>
  );

  const renderClientSearch = () => (
    <div className="mt-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-4 text-white pr-10 placeholder-gray-400"
            placeholder="חפש לקוח לפי שם, איש קשר או טלפון..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">{client.name}</h3>
                <p className="text-sm text-gray-400">{client.contactName}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {client.status === 'active' ? 'פעיל' : 'לא פעיל'}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">סה״כ חיובים:</span>
                <span className="text-white">₪{client.totalBilled.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">יתרה לתשלום:</span>
                <span className={client.outstandingBalance > 0 ? 'text-yellow-500' : 'text-green-500'}>
                  ₪{client.outstandingBalance.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              פעילות אחרונה: {new Date(client.lastActivity).toLocaleDateString('he-IL')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvoicesTable = () => (
    <InvoiceManagement />
  );

  const renderReports = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">דוח תזרים מזומנים</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">הכנסות</span>
            <span className="text-green-500">₪245,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">הוצאות</span>
            <span className="text-red-500">₪180,000</span>
          </div>
          <div className="pt-4 border-t border-gray-700 flex justify-between">
            <span className="font-medium text-white">רווח נקי</span>
            <span className="font-medium text-white">₪65,000</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-4">חייבים לפי גיל</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">0-30 ימים</span>
            <span className="text-white">₪25,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">31-60 ימים</span>
            <span className="text-yellow-500">₪15,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">60+ ימים</span>
            <span className="text-red-500">₪5,650</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientProfile = () => {
    if (!selectedClient) return null;

    return (
      <div 
        className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedClient(null);
            setIsEditing(false);
            setEditedClient(null);
          }
        }}
      >
        <Draggable
          handle=".drag-handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          scale={1}
          onStart={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'input') {
              return false;
            }
          }}
        >
          <div className="bg-gray-800 rounded-lg w-[800px] h-[800px] overflow-y-auto">
            <div className="sticky top-0 z-[60] backdrop-blur-md">
              <div className="bg-gray-800/95 p-6 border-b border-gray-700 drag-handle cursor-move select-none">
                <div className="flex justify-between items-start">
                  <div onClick={handleFieldClick} className="cursor-pointer">
                    {isEditing ? (
                      <input
                        type="text"
                        className="bg-gray-900/50 border border-gray-700 rounded px-3 py-1 text-xl font-semibold text-white w-full"
                        value={editedClient?.name || ''}
                        onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
                        autoFocus
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-white hover:bg-gray-700/50 px-2 py-1 rounded">
                        {selectedClient.name}
                      </h2>
                    )}
                    {isEditing ? (
                      <input
                        type="text"
                        className="bg-gray-900/50 border border-gray-700 rounded px-3 py-1 mt-1 text-gray-400 w-full"
                        value={editedClient?.contactName || ''}
                        onChange={(e) => setEditedClient({ ...editedClient, contactName: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-400 hover:bg-gray-700/50 px-2 py-1 rounded mt-1">
                        {selectedClient.contactName}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 relative z-[70]">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          שמור
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedClient(selectedClient);
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          בטל
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        ערוך
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setSelectedClient(null);
                        setIsEditing(false);
                        setEditedClient(null);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Details */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">פרטי התקשרות</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">טלפון</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded px-2 py-1 mt-1 text-white"
                        value={editedClient?.phone || ''}
                        onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })}
                      />
                    ) : (
                      <p 
                        className="text-white hover:bg-gray-700/50 px-2 py-1 rounded cursor-pointer"
                        onClick={handleFieldClick}
                      >
                        {selectedClient.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">דוא״ל</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded px-2 py-1 mt-1 text-white"
                        value={editedClient?.email || ''}
                        onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
                      />
                    ) : (
                      <p 
                        className="text-white hover:bg-gray-700/50 px-2 py-1 rounded cursor-pointer"
                        onClick={handleFieldClick}
                      >
                        {selectedClient.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
      
              {/* Financial Summary */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">סיכום פיננסי</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">סה״כ חיובים</span>
                    <p className="text-white text-lg">₪{selectedClient.totalBilled.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">יתרה לתשלום</span>
                    <p className={`text-lg ${selectedClient.outstandingBalance > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                      ₪{selectedClient.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
      
              {/* Projects */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">פרויקטים</h3>
                <div className="space-y-3">
                  {selectedClient.projects.map((project) => (
                    <div key={project.id} className="bg-gray-900/50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <p className="text-sm text-gray-400">#{project.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">₪{project.value.toLocaleString()}</p>
                          <span className={`text-xs ${
                            project.status === 'active' ? 'text-green-500' : 'text-blue-500'
                          }`}>
                            {project.status === 'active' ? 'פעיל' : 'הושלם'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Invoices */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">חשבוניות אחרונות</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                          מספר חשבונית
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                          תאריך
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                          סכום
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                          סטטוס
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {selectedClient.recentInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(invoice.date).toLocaleDateString('he-IL')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            ₪{invoice.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invoice.status === 'paid' ? 'שולם' : 'ממתין'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">הנהלת חשבונות</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          חשבונית חדשה +
        </button>
      </div>

      {renderFinancialSummary()}
      {renderTabs()}
      
      {activeTab === 'invoices' && renderInvoicesTable()}
      {activeTab === 'reports' && renderReports()}
      {activeTab === 'clients' && renderClientSearch()}
      {selectedClient && renderClientProfile()}
    </div>
  );
};

export default Accounting;