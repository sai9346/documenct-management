// src/App.tsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SearchBar } from './components/SearchBar';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentList } from './components/DocumentList';
import { useDocuments } from './hooks/useDocuments';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [searchQuery, setSearchQuery] = useState('');
  const { documents, loading, error, fetchDocuments, uploadDocuments } = useDocuments('user123');

  useEffect(() => {
    fetchDocuments(activeTab === 'public', searchQuery);
  }, [activeTab, searchQuery, fetchDocuments]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUpload = (files: File[], isPublic: boolean) => {
    uploadDocuments(files, isPublic);
  };

  return (
    <AppContainer>
      <h1>Document Management</h1>
      <SearchBar onSearch={handleSearch} />
      <DocumentUpload onUpload={handleUpload} />
      <TabContainer>
        <Tab active={activeTab === 'public'} onClick={() => setActiveTab('public')}>
          Public Documents
        </Tab>
        <Tab active={activeTab === 'private'} onClick={() => setActiveTab('private')}>
          Private Documents
        </Tab>
      </TabContainer>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <DocumentList documents={documents} isPublic={activeTab === 'public'} />
      )}
    </AppContainer>
  );
};

export default App;