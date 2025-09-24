import React, { useState } from 'react';
import SignInPage from '@/components/auth/SignInPage';
import Dashboard from '@/components/dashboard/Dashboard';
import GroupDetail from '@/components/groups/GroupDetail';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentView, setCurrentView] = useState('auth');
  
  // Demo navigation
  const renderView = () => {
    switch (currentView) {
      case 'auth':
        return <SignInPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'group':
        return <GroupDetail />;
      default:
        return <SignInPage />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      {currentView !== 'auth' && (
        <div className="fixed top-4 right-4 z-50 flex space-x-2">
          <Button 
            variant={currentView === 'dashboard' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            variant={currentView === 'group' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentView('group')}
          >
            Group Detail
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('auth')}
          >
            Sign Out
          </Button>
        </div>
      )}
      
      {/* Mock auth flow */}
      {currentView === 'auth' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Button 
            onClick={() => setCurrentView('dashboard')}
            variant="wallet"
            className="shadow-lg"
          >
            Skip to Dashboard Demo
          </Button>
        </div>
      )}
      
      {renderView()}
    </div>
  );
};

export default Index;
