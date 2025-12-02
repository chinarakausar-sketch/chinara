import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import ScamAnalyzer from './components/ScamAnalyzer';
import KnowledgeBase from './components/KnowledgeBase';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderContent = () => {
    switch (currentView) {
      case View.CHAT:
        return <ChatInterface />;
      case View.ANALYZER:
        return <ScamAnalyzer />;
      case View.KNOWLEDGE:
        return <KnowledgeBase />;
      case View.HOME:
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;