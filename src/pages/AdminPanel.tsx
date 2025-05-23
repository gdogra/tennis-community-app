import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel({ user }: { user: any }) {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-2">🛠️ Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user.email} (admin)</p>
      <div className="flex justify-center space-x-4">
        <button onClick={() => navigate("/admin/players")} className="btn">
          Manage Players
        </button>
        <button onClick={() => navigate("/admin/tournaments")} className="btn">
          View Tournaments
        </button>
        <button onClick={() => navigate("/admin/matches")} className="btn">
          Moderate Matches
        </button>
      </div>
    </div>
  );
}

