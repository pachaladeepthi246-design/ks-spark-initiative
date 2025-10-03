import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Search, User, LogOut, Briefcase, Menu, X, Settings, FileText } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-dark-800 border-b border-dark-600 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-electric-500 font-bold text-xl font-space hover:text-electric-400 transition-all duration-200 neon-text"
              onClick={closeMobileMenu}
            >
              <Briefcase className="h-8 w-8 animate-pulse" />
              <span>DeJob.io</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-electric-500 font-medium font-space transition-all duration-200 hover:text-shadow-neon relative group"
            >
              <span>Home</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-300 hover:text-electric-500 font-medium font-space transition-all duration-200 hover:text-shadow-neon relative group"
            >
              <span>Jobs</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-500 transition-all duration-300 group-hover:w-full"></div>
            </Link>
            
            {/* Admin Links */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-gray-300 hover:text-cyber-500 font-medium font-space transition-all duration-200 flex items-center space-x-1 hover:text-shadow-neon relative group"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-500 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 text-gray-300 hover:text-neon-500 font-medium font-space transition-all duration-200 hover:text-shadow-neon relative group"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-300 hover:text-red-400 font-medium font-space transition-all duration-200 px-3 py-1.5 rounded border border-transparent hover:border-red-400/30 hover:bg-red-400/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-electric-500 font-medium font-space transition-all duration-200 hover:text-shadow-neon"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-electric-500 text-dark-900 px-6 py-2 rounded-lg font-semibold font-space hover:bg-electric-400 transition-all duration-200 shadow-glow-electric hover:shadow-lg transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-electric-500 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-electric-500 transition-all duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-700 border-b border-dark-600 matrix-bg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-electric-500 hover:bg-dark-600 transition-all duration-200 font-space"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-electric-500 hover:bg-dark-600 transition-all duration-200 font-space"
              onClick={closeMobileMenu}
            >
              Jobs
            </Link>
            
            {/* Admin Links for Mobile */}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyber-500 hover:bg-dark-600 transition-all duration-200 font-space"
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </Link>
            )}
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-neon-500 hover:bg-dark-600 transition-all duration-200 font-space"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-red-400 hover:bg-dark-600 transition-all duration-200 font-space"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-electric-500 hover:bg-dark-600 transition-all duration-200 font-space"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-electric-500 text-dark-900 hover:bg-electric-400 transition-all duration-200 font-space shadow-glow-electric"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar