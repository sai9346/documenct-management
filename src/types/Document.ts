// src/types/Document.ts
export interface Document {
  id: string;
  name: string;
  isPublic: boolean;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}