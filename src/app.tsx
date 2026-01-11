import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { ToolPlayground } from './pages/ToolPlayground.tsx';
import { ContentLibrary } from './pages/ContentLibrary.tsx';
import { Settings } from './pages/Settings.tsx';
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
