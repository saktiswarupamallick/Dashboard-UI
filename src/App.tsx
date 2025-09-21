import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { THEME_CLASSES } from './utils/theme';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import ActivitySidebar from './components/ActivitySidebar';
import DashboardSkeleton from './components/DashboardSkeleton';
import DefaultPageSkeleton from './components/DefaultPageSkeleton';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Default = lazy(() => import('./pages/Default'));

function App() {

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <Router>
            <div className={`h-screen w-screen overflow-hidden ${THEME_CLASSES.DASHBOARD_BG} transition-colors duration-300`}>
              <div className="flex h-full w-full">
                <Sidebar />
                
                <div className="flex-1 flex flex-col h-full min-w-0">
                  <Header />
                  
                  <main className="flex-1 transition-all duration-300 overflow-hidden min-w-0">
                    <div className="h-full overflow-y-auto min-w-0">
                      <ErrorBoundary>
                        <Suspense fallback={<DashboardSkeleton />}>
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/default" element={
                              <Suspense fallback={<DefaultPageSkeleton />}>
                                <Default />
                              </Suspense>
                            } />
                            
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  </main>
                </div>

                <ActivitySidebar />
              </div>
            </div>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;