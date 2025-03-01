import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PredictionsPage from './pages/PredictionsPage';
import MapView from './pages/MapView';
import DataManagement from './pages/DataManagement';
import Settings from './pages/Settings';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/predictions" element={<PredictionsPage />} />
                            <Route path="/map" element={<MapView />} />
                            <Route path="/data" element={<DataManagement />} />
                            <Route path="/settings" element={<Settings />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;