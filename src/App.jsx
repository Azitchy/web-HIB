import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React, { useContext } from 'react'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Renew from './pages/Renew'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import EO from './pages/EO'
import OfflineDrafts from './pages/OfflineDrafts'
import PaymentStub from './pages/PaymentStub'
import Login from './pages/Login'
import { AuthProvider, AuthContext } from './contexts/AuthContext'

function AppContent(){
  const { user, logout } = useContext(AuthContext)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded flex items-center justify-center font-bold">HIB</div>
              <div>
                <div className="text-lg font-semibold">Health Insurance Beneficiary (HIB)</div>
                <div className="text-sm text-gray-500">Member management prototype</div>
              </div>
            </div>
            <nav>
              <ul className="flex items-center gap-4">
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/">Home</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/apply">New Application</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/renew">Renewal</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/drafts">Drafts</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/eo">EO</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/admin">Admin</Link></li>
                <li><Link className="text-sm text-indigo-600 hover:underline" to="/profile">Profile</Link></li>
              </ul>
            </nav>
            <div>
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={logout}>Logout</button>
                </div>
              ) : (
                <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
              )}
            </div>
          </div>
        </header>

        <main className="bg-white rounded-lg p-6 shadow-sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/renew" element={<Renew />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/drafts" element={<OfflineDrafts />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/eo" element={<EO />} />
            <Route path="/payment/:id" element={<PaymentStub />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
