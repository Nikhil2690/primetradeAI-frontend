import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Sidebar from './components/Sidebar' // 1. Added Import
import Navbar from './components/Navbar'   // 1. Added Import
import { useAuthStore } from './store/useAuthStore'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'

function App() {
  const { checkAuth, loading, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Just call checkAuth. It already checks for the token internally.
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path='/register' element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

    <Route path="/dashboard" element={
      <ProtectedRoute>
        <div className="flex h-screen w-full bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
              <Dashboard />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    } />

      <Route path="/profile" element={
      <ProtectedRoute>
        <div className="flex h-screen w-full bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-10 flex justify-center">
              <Profile />
            </main>
          </div>
        </div>
      </ProtectedRoute>
    } />

    <Route path="/tasks" element={
          <ProtectedRoute>
            <div className="flex h-screen w-full bg-gray-50">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden mx-auto mt-10 w-3xl overflow-y-auto p-10">
                  <Tasks />
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App