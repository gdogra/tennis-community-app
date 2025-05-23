import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Challenge {
  id: string;
  scheduled_at: string;
  notes: string;
  status: string;
  created_at: string;
  challenger: { name: string; id: string };
  opponent: { name: string; id: string };
  court: { name: string };
}

export default function MyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChallenges() {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;
      setCurrentUserId(userId);

      // Fetch challenges where user is challenger or opponent
      const { data, error } = await supabase
        .from("challenges")
        .select(`
          id,
          scheduled_at,
          notes,
          status,
          created_at,
          challenger:challenger_id (id, name),
          opponent:opponent_id (id, name),
          court:court_id (name)
        `)
        .or(`challenger_id.eq.${userId},opponent_id.eq.${userId}`)
        .order("scheduled_at", { ascending: false });

      if (!error && data) {
        setChallenges(data);
      }
      setLoading(false);
    }

    fetchChallenges();
  }, []);

  async function handleAction(challengeId: string, newStatus: "accepted" | "declined") {
    setActionLoading(challengeId + newStatus);
    const { error } = await supabase
      .from("challenges")
      .update({ status: newStatus })
      .eq("id", challengeId);
    if (error) {
      alert(error.message);
    } else {
      setChallenges((prev) =>
        prev.map((c) => (c.id === challengeId ? { ...c, status: newStatus } : c))
      );
    }
    setActionLoading(null);
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 24, background: "#fff", borderRadius: 12 }}>
      <h2>My Challenges</h2>
      {loading ? (
        <div>Loading...</div>
      ) : challenges.length === 0 ? (
        <div>No challenges found.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Court</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => {
              const isPending = c.status === "pending";
              const canAct =
                isPending &&
                c.opponent?.id === currentUserId;

              return (
                <tr key={c.id}>
                  <td>
                    {c.challenger?.name && c.opponent?.name
                      ? `${c.challenger.name} vs ${c.opponent.name}`
                      : c.challenger?.name || c.opponent?.name || "Unknown"}
                  </td>
                  <td>{c.court?.name || "Unknown"}</td>
                  <td>{new Date(c.scheduled_at).toLocaleString()}</td>
                  <td>{c.status}</td>
                  <td>{c.notes}</td>
                  <td>
                    {canAct ? (
                      <>
                        <button
                          onClick={() => handleAction(c.id, "accepted")}
                          disabled={actionLoading === c.id + "accepted"}
                          style={{ marginRight: 8 }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(c.id, "declined")}
                          disabled={actionLoading === c.id + "declined"}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

