import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import KSHomePage from './pages/KSHomePage'
import DonatePage from './pages/DonatePage'
import StudentsPage from './pages/StudentsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SubmitToolPage from './pages/SubmitToolPage'
import ProfilePage from './pages/ProfilePage'
import AdminLayout from './pages/admin/AdminLayout'
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard'
import ToolsManagement from './pages/admin/ToolsManagement'
import { Toaster } from 'sonner'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ks" element={<KSHomePage />} />
            <Route path="/ks/donate" element={<DonatePage />} />
            <Route path="/ks/students" element={<StudentsPage />} />
            <Route path="/submit" element={<SubmitToolPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AnalyticsDashboard />} />
            <Route path="tools" element={<ToolsManagement />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App