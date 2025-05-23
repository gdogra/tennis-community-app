import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ProposeChallenge() {
  const [players, setPlayers] = useState<any[]>([]);
  const [courts, setCourts] = useState<any[]>([]);
  const [opponentId, setOpponentId] = useState("");
  const [courtId, setCourtId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load players and courts
  useEffect(() => {
    async function fetchData() {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setCurrentUserId(userData.user.id);

      // Fetch all players except current user
      const { data: playerList } = await supabase
        .from("players")
        .select("id,name")
        .neq("id", userData.user.id);

      setPlayers(playerList || []);

      // Fetch courts
      const { data: courtList } = await supabase
        .from("courts")
        .select("id,name");

      setCourts(courtList || []);
    }
    fetchData();
  }, []);

  // Handle submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!opponentId || !courtId || !date) {
      setError("Please select opponent, court, and date/time.");
      setLoading(false);
      return;
    }

    // Insert into challenges table
    const { error } = await supabase.from("challenges").insert([
      {
        challenger_id: currentUserId,
        opponent_id: opponentId,
        court_id: courtId,
        scheduled_at: new Date(date).toISOString(),
        notes,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) setError(error.message);
    else {
      alert("Challenge proposed!");
      navigate("/my-challenges");
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", background: "#fff", padding: 24, borderRadius: 12 }}>
      <h2>Propose Challenge</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Opponent:
          <select value={opponentId} onChange={e => setOpponentId(e.target.value)} required>
            <option value="">-- Choose an opponent --</option>
            {players.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          Court:
          <select value={courtId} onChange={e => setCourtId(e.target.value)} required>
            <option value="">-- Choose a court --</option>
            {courts.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Date/Time:
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Notes:
          <input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional notes"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Propose Challenge"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}

