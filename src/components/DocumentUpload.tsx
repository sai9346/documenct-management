// src/components/DocumentUpload.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  margin-bottom: 20px;
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PrivacyToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

interface DocumentUploadProps {
  onUpload: (files: File[], isPublic: boolean) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files) {
      onUpload(Array.from(files), isPublic);
    }
  };

  return (
    <UploadContainer>
      <UploadForm onSubmit={handleSubmit}>
        <FileInput
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <PrivacyToggle>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            id="privacy-toggle"
          />
          <label htmlFor="privacy-toggle">Make documents public</label>
        </PrivacyToggle>
        <UploadButton type="submit">Upload</UploadButton>
      </UploadForm>
    </UploadContainer>
  );
};