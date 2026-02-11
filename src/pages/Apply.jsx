import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pushApp } from '../utils/storage'

export default function Apply() {
  const [form, setForm] = useState({ name: '', phone: '', citizenship: '', address: '' })
  const navigate = useNavigate()

  const saveDraft = () => {
    const app = { ...form, id: Date.now(), type: 'new', status: 'draft', createdAt: new Date().toISOString() }
    pushApp(app)
    alert('Saved draft locally')
  }

  const submit = () => {
    const app = { ...form, id: Date.now(), type: 'new', status: 'submitted', createdAt: new Date().toISOString() }
    pushApp(app)
    navigate(`/payment/${app.id}`)
  }

  return (
    <div className="max-w-md">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">New Health Insurance Application</h3>
      <label className="block text-gray-700">Name
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="block text-gray-700 mt-3">Phone
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </label>
      <label className="block text-gray-700 mt-3">Citizenship No.
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.citizenship} onChange={(e) => setForm({ ...form, citizenship: e.target.value })} />
      </label>
      <label className="block text-gray-700 mt-3">Address
        <input className="w-full border rounded px-3 py-2 mt-1" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      </label>
      <div className="mt-4">
        <button onClick={saveDraft} className="px-4 py-2 bg-gray-200 rounded">Save Draft (offline)</button>
        <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded ml-3">Submit & Pay</button>
      </div>
    </div>
  )
}
