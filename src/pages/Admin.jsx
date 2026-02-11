import React, { useState, useEffect, useContext } from 'react'
import apiFetch from '../utils/api'
import { AuthContext } from '../contexts/AuthContext'

export default function Admin(){
  const [apps, setApps] = useState([])
  const { token } = useContext(AuthContext)

  useEffect(()=>{
    async function load(){
      const res = await apiFetch('/api/applications', { token })
      setApps(res || [])
    }
    load()
  },[token])

  const issuePolicy = async (id)=>{
    await apiFetch(`/api/applications/${id}/status`, { method: 'POST', token, body: { status: 'approved', comment:'Issued by admin' } })
    // trigger backend SMS stub
    const app = apps.find(a=>a.id===id)
    if (app) await apiFetch('/api/sms/send', { method:'POST', token, body: { to: app.data?.phone || app.phone || '', message: `Your policy for ${app.applicant_name||app.name} is issued.` } })
    setApps(apps.map(a=> a.id===id ? { ...a, status: 'approved' } : a))
    alert('Policy issued (backend stub).')
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
      <p className="text-sm text-gray-600 mb-4">Monitor submitted applications and issue policies.</p>
      <div className="space-y-3">
        {apps.map(a=> (
          <div key={a.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{a.applicant_name || (a.data && a.data.name) || 'Applicant'}</div>
              <div className="text-sm text-gray-500">{a.product} • {a.status}</div>
            </div>
            <div>
              {a.status !== 'approved' && (
                <button onClick={()=>issuePolicy(a.id)} className="px-3 py-1 bg-green-600 text-white rounded">Issue Policy</button>
              )}
              {a.status === 'approved' && <span className="text-sm text-green-600">Approved</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
