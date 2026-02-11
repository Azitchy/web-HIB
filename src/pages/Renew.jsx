import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pushApp } from '../utils/storage'

export default function Renew() {
  const [form, setForm] = useState({ name: '', phone: '', policyNo: '' })
  const navigate = useNavigate()

  const submit = () => {
    const app = { ...form, id: Date.now(), type: 'renewal', status: 'submitted', createdAt: new Date().toISOString() }
    pushApp(app)
    navigate(`/payment/${app.id}`)
  }

  return (
    <div className="max-w-md">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">Policy Renewal</h3>
      <label className="block text-gray-700">Policy Number
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.policyNo} onChange={(e) => setForm({ ...form, policyNo: e.target.value })} />
      </label>
      <label className="block text-gray-700 mt-3">Name
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="block text-gray-700 mt-3">Phone
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </label>
      <button onClick={submit} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Submit Renewal & Pay</button>
    </div>
  )
}
