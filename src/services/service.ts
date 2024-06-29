// src/api.ts
import axios from 'axios';
import { Especialista } from '../models/Especialista';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchData = async (endpoint: string): Promise<Especialista[]> => {
  const response = await apiClient.get(endpoint);
  return response.data;
};