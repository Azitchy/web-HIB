import React from 'react'

export default function Home() {
  return (
    <div className="prose max-w-none text-gray-800">
      <h2 className="text-2xl font-semibold text-gray-800">Health Insurance Beneficiary (HIB)</h2>
      <p className="text-gray-600">Welcome to the HIB management system prototype.</p>
      <ul className="text-gray-700">
        <li>Apply for new health insurance</li>
        <li>Renew existing policy</li>
        <li>Save drafts offline and sync later</li>
      </ul>
    </div>
  )
}
