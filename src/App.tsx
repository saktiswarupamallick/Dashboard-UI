import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { THEME_CLASSES } from './utils/theme';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

import ActivitySidebar from './components/ActivitySidebar';
import Default from './pages/Default';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activitySidebarOpen, setActivitySidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleActivitySidebar = () => {
    setActivitySidebarOpen(prev => !prev);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className={`h-screen ${THEME_CLASSES.DASHBOARD_BG} transition-colors duration-300`}>
          <div className="flex h-full">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
            
            <div className="flex-1  flex flex-col h-full">
              <Header 
                onSidebarToggle={toggleSidebar}
                onActivityToggle={toggleActivitySidebar}
              />
              
              <main className="flex-1 transition-all duration-300 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/default" element={<Default />} />
                </Routes>
              </main>
            </div>

            <ActivitySidebar 
              isOpen={activitySidebarOpen} 
              onToggle={toggleActivitySidebar} 
            />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;