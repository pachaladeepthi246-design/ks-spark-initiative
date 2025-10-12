import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import KSHomePage from './pages/KSHomePage'
import DonatePage from './pages/DonatePage'
import StudentsPage from './pages/StudentsPage'
import { Toaster } from '@/components/ui/toaster'
import './index.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ks" element={<KSHomePage />} />
            <Route path="/ks/donate" element={<DonatePage />} />
            <Route path="/ks/students" element={<StudentsPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App