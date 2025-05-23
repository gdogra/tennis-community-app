import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ChallengeForm() {
  const [players, setPlayers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [opponentId, setOpponentId] = useState("");
  const [courtId, setCourtId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    supabase.from("players").select("id,name").then(({ data }) => setPlayers(data || []));
    supabase.from("courts").select("id,name").then(({ data }) => setCourts(data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    await supabase.from("challenges").insert({
      challenger_id: user.id,
      opponent_id: opponentId,
      court_id: courtId,
      scheduled_at: scheduledAt,
      notes,
    });
    alert("Challenge proposed!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Propose a Challenge</h2>
      <select value={opponentId} onChange={e => setOpponentId(e.target.value)} required>
        <option value="">Select opponent</option>
        {players.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select value={courtId} onChange={e => setCourtId(e.target.value)} required>
        <option value="">Select court</option>
        {courts.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} required />
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />
      <button type="submit">Send Challenge</button>
    </form>
  );
}
