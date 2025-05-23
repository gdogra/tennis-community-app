import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    supabase.from("players").select("*").order("points", { ascending: false }).limit(10)
      .then(({ data }) => setPlayers(data || []));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {players.map((p: any) => (
          <li key={p.id}>{p.name} — {p.points} pts</li>
        ))}
      </ol>
    </div>
  );
}
