// src/components/DocumentList.tsx
import React from 'react';
import styled from 'styled-components';
import { Document } from '../types/Document';
import { formatDate } from '../utils/formatDate';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const DocumentName = styled.span`
  font-weight: bold;
`;

const DocumentInfo = styled.span`
  color: #666;
`;

interface DocumentListProps {
  documents: Document[];
  isPublic: boolean;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, isPublic }) => {
  return (
    <ListContainer>
      <h2>{isPublic ? 'Public Documents' : 'Private Documents'}</h2>
      {documents.map((doc) => (
        <DocumentItem key={doc.id}>
          <DocumentName>{doc.name}</DocumentName>
          <DocumentInfo>
            Uploaded on {formatDate(doc.uploadedAt)} by {doc.uploadedBy}
          </DocumentInfo>
        </DocumentItem>
      ))}
    </ListContainer>
  );
};