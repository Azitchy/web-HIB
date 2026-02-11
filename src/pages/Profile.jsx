import React from 'react'
import { readApps } from '../utils/storage'

export default function Profile() {
  const apps = readApps()
  const last = apps.slice().reverse()[0]

  return (
    <div className="max-w-md text-gray-800">
      <h3 className="text-xl font-semibold mb-3">My Profile</h3>
      {last ? (
        <div className="space-y-2">
          <p><strong className="text-gray-700">Name:</strong> {last.name}</p>
          <p><strong className="text-gray-700">Phone:</strong> {last.phone}</p>
          <p><strong className="text-gray-700">Status:</strong> {last.status}</p>
          <p><strong className="text-gray-700">Type:</strong> {last.type}</p>
        </div>
      ) : (
        <p className="text-gray-600">No applications yet. Start with New Application.</p>
      )}
    </div>
  )
}
