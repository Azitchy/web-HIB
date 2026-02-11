import React, { useState, useEffect } from 'react'
import { readApps, writeApps } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function OfflineDrafts() {
  const [drafts, setDrafts] = useState([])
  const navigate = useNavigate()

  useEffect(() => setDrafts(readApps().filter(a => a.status === 'draft')), [])

  const sync = (id) => {
    const apps = readApps()
    const idx = apps.findIndex(a => a.id === id)
    if (idx >= 0) {
      apps[idx].status = 'submitted'
      writeApps(apps)
      setDrafts(apps.filter(a => a.status === 'draft'))
      navigate(`/payment/${id}`)
    }
  }

  return (
    <div className="max-w-md text-gray-800">
      <h3 className="text-xl font-semibold mb-3">Offline Drafts</h3>
      {drafts.length === 0 && <p className="text-gray-600">No drafts saved.</p>}
      <div className="space-y-2">
        {drafts.map(d => (
          <div key={d.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{d.name || 'Untitled'}</div>
              <div className="text-sm text-gray-500">{d.phone}</div>
            </div>
            <button onClick={() => sync(d.id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Sync & Pay</button>
          </div>
        ))}
      </div>
    </div>
  )
}
