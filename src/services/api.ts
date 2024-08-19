// src/services/api.ts
import { Document } from '../types/Document';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockDocuments: Document[] = [
  // ... populate with some mock data
];

export const api = {
  uploadDocuments: async (files: File[], isPublic: boolean, userId: string): Promise<Document[]> => {
    await delay(1000); // Simulate network delay
    const newDocuments: Document[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      isPublic,
      uploadedBy: userId,
      uploadedAt: new Date(),
      url: URL.createObjectURL(file)
    }));
    mockDocuments.push(...newDocuments);
    return newDocuments;
  },

  getDocuments: async (userId: string, isPublic: boolean, search: string = '', page: number = 1, limit: number = 10): Promise<{ documents: Document[], total: number }> => {
    await delay(500); // Simulate network delay
    let filtered = mockDocuments.filter(doc => doc.isPublic === isPublic || doc.uploadedBy === userId);
    if (search) {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()));
    }
    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    return { documents: filtered.slice(start, end), total };
  }
};