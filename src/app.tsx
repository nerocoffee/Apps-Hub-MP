import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ToolPlayground } from './pages/ToolPlayground';
import { ContentLibrary } from './pages/ContentLibrary';
import { Settings } from './pages/Settings';
export function App() {
  return <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tool/:toolId" element={<ToolPlayground />} />
          <Route path="/tools" element={<Navigate to="/" replace />} />
          <Route path="/library" element={<ContentLibrary />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>;
}
