import axios from 'axios';
import { Deal, ApiResponse } from '../types/deal.types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const dealApi = {
  // Get all deals
  getDeals: async (): Promise<Deal[]> => {
    const response = await api.get<ApiResponse<Deal[]>>('/deals');
    return response.data.data;
  },

  // Get single deal by ID
  getDealById: async (id: number): Promise<Deal> => {
    const response = await api.get<ApiResponse<Deal>>(`/deals/${id}`);
    return response.data.data;
  },

  // Create new deal
  createDeal: async (dealData: Partial<Deal>): Promise<Deal> => {
    const response = await api.post<ApiResponse<Deal>>('/deals', dealData);
    return response.data.data;
  },

  // Update existing deal
  updateDeal: async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
    const response = await api.put<ApiResponse<Deal>>(`/deals/${id}`, dealData);
    return response.data.data;
  },

  // Delete deal
  deleteDeal: async (id: number): Promise<void> => {
    await api.delete(`/deals/${id}`);
  },

  // Search deals
  searchDeals: async (query: string): Promise<Deal[]> => {
    const response = await api.get<ApiResponse<Deal[]>>(`/deals/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  },
};

export default api;

// Made with Bob
