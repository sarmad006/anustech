"use strict";

interface Invoice {
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

class InvoiceService {
  constructor() {
    if (typeof window === "undefined") {
      return;
    }
  }

  async getAll(): Promise<Invoice[]> {
    try {
      const response = await fetch("/api/invoices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch invoices");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  async getFinanceSummary() {
    try {
      const response = await fetch("/api/finance/summary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch invoices");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  async getFinanceReports() {
    try {
      const response = await fetch("/api/finance/aging-report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch invoices");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  async create(data: Invoice): Promise<Invoice> {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create invoice");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update invoice");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`/api/invoices/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete invoice");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      throw error;
    }
  }
}

// Exporting an instance of InvoiceService
const invoiceService = new InvoiceService();
export default invoiceService;
