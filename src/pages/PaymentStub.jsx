import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { readApps, writeApps } from '../utils/storage'

export default function PaymentStub() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apps = readApps()
  const app = apps.find(a => String(a.id) === String(id))
  const [otp, setOtp] = useState('')

  if (!app) return <div className="text-gray-800">Application not found.</div>

  const amount = 1000 // simple fixed amount for prototype

  const pay = () => {
    // simple OTP check: require 4 chars
    if (otp.length < 3) return alert('Enter OTP (simulated)')
    const idx = apps.findIndex(a => a.id === app.id)
    if (idx >= 0) {
      apps[idx].status = 'pending' // awaiting EO verification
      apps[idx].paid = true
      writeApps(apps)
      alert('Payment recorded. Application moved to verification queue.')
      navigate('/eo')
    }
  }

  return (
    <div className="max-w-md text-gray-800">
      <h3 className="text-xl font-semibold mb-2">Payment</h3>
      <p className="text-gray-700">Applicant: {app.name} ({app.phone})</p>
      <p className="text-gray-700">Amount: NPR {amount}</p>
      <label className="block text-gray-700 mt-3">OTP (simulated):
        <input className="w-full border rounded px-3 py-2 mt-1" value={otp} onChange={(e) => setOtp(e.target.value)} />
      </label>
      <button onClick={pay} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Confirm Payment</button>
    </div>
  )
}
