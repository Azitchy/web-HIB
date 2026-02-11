import React, { useEffect, useState, useContext } from 'react'
import apiFetch from '../utils/api'
import { AuthContext } from '../contexts/AuthContext'

export default function EO(){
  const [apps, setApps] = useState([])
  const { token } = useContext(AuthContext)

  useEffect(()=>{
    async function load(){
      const res = await apiFetch('/api/applications', { token })
      setApps(res || [])
    }
    load()
  },[token])

  const approve = async (id) => {
    await apiFetch(`/api/applications/${id}/status`, { method: 'POST', token, body: { status: 'verified' } })
    setApps(apps.map(a=> a.id===id ? { ...a, status: 'verified' } : a))
    alert('Application verified (backend stub).')
  }

  const reject = async (id) => {
    await apiFetch(`/api/applications/${id}/status`, { method: 'POST', token, body: { status: 'rejected' } })
    setApps(apps.filter(a=> a.id!==id))
    alert('Application rejected (backend stub).')
  }

  const pending = apps.filter(a=> a.status === 'submitted' || a.status === 'pending')

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Verification Officer (EO)</h3>
      <p className="text-sm text-gray-600 mb-4">Verify pending applications.</p>
      <div className="space-y-3">
        {pending.length === 0 && <div className="text-sm text-gray-500">No pending applications.</div>}
        {pending.map(a => (
          <div key={a.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{a.applicant_name || (a.data && a.data.name) || 'Applicant'}</div>
              <div className="text-sm text-gray-500">{a.product}</div>
            </div>
            <div>
              <button onClick={() => approve(a.id)} className="px-3 py-1 bg-green-600 text-white rounded mr-2">Approve</button>
              <button onClick={() => reject(a.id)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
