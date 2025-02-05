"use strict";

interface Client {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  recentActivity: string;
  project: string | object;
  invoices: string | object;
}

class ClientService {
  constructor() {
    if (typeof window === "undefined") {
      return;
    }
  }

  // Fetch all clients including related project and invoice data
  async getAll(): Promise<Client[]> {
    try {
      const response = await fetch("/api/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch clients");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  // Create a new client with related project and invoice information
  async create(data: Client): Promise<Client> {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create client");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  }

  // Update an existing client, including related project and invoice information
  async update(id: string, data: Partial<Client>): Promise<Client> {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update client");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  }

  // Delete a client by ID
  async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete client");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  }
}

// Exporting an instance of ClientService for usage in other parts of the app
const clientService = new ClientService();
export default clientService;
