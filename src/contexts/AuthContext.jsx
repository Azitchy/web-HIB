import React, { createContext, useState, useEffect } from 'react'
import apiFetch from '../utils/api'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(()=>{
    if (token){
      const u = JSON.parse(localStorage.getItem('user'))
      setUser(u)
    }
  },[token])

  const login = async (email,password)=>{
    const res = await apiFetch('/api/auth/login',{method:'POST', body:{email,password}})
    if (res.token){
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      return { ok:true }
    }
    return { ok:false, message: res.message }
  }

  const logout = ()=>{
    setToken(null); setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
