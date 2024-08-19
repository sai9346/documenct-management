// src/hooks/useDocuments.ts
import { useState, useCallback } from 'react';
import { Document } from '../types/Document';
import { api } from '../services/api';

export const useDocuments = (userId: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchDocuments = useCallback(async (isPublic: boolean, search: string = '', page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getDocuments(userId, isPublic, search, page);
      setDocuments(result.documents);
      setTotal(result.total);
    } catch (err) {
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const uploadDocuments = useCallback(async (files: File[], isPublic: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const newDocuments = await api.uploadDocuments(files, isPublic, userId);
      setDocuments(prev => [...newDocuments, ...prev]);
    } catch (err) {
      setError('Failed to upload documents');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { documents, loading, error, total, fetchDocuments, uploadDocuments };
};