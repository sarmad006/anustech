'use client';

import React from 'react';

interface InvoiceModalProps {
  invoice: any;
  client: any;
  onClose: () => void;
  onUpdate: (invoice: any) => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, client, onClose, onUpdate }) => {
  // ... תוכן הקומפוננטה
};

export default InvoiceModal; 