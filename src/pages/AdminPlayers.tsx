// AdminPlayers.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from("players").select("*");
      if (error) console.error("Failed to fetch players:", error);
      else setPlayers(data);
    };
    fetchPlayers();
  }, []);

  return (
    <div className="p-4">
      <button onClick={() => navigate("/admin")} className="mb-4 px-3 py-1 border rounded">
        ← Back to Admin Dashboard
      </button>
      <h2 className="text-xl font-bold mb-4">🎾 Player List</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Skill Level</th>
            <th className="border px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="border px-4 py-2">{player.name}</td>
              <td className="border px-4 py-2">{player.skill_level}</td>
              <td className="border px-4 py-2">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

