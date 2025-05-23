// src/pages/AdminTournaments.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminTournaments() {
  return (
    <div className="p-4">
      <Link to="/admin" className="text-blue-500 underline mb-4 block">← Back to Admin Dashboard</Link>
      <h2 className="text-xl font-semibold mb-4">🏆 Tournament Management</h2>
      <p>List and manage tournaments here. (Coming soon)</p>

      <table className="mt-4 w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Tournament Name</th>
            <th className="border px-4 py-2 text-left">Location</th>
            <th className="border px-4 py-2 text-left">Start Date</th>
            <th className="border px-4 py-2 text-left">End Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Spring Open</td>
            <td className="border px-4 py-2">New York</td>
            <td className="border px-4 py-2">2025-06-01</td>
            <td className="border px-4 py-2">2025-06-10</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Summer Classic</td>
            <td className="border px-4 py-2">Los Angeles</td>
            <td className="border px-4 py-2">2025-07-15</td>
            <td className="border px-4 py-2">2025-07-22</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

