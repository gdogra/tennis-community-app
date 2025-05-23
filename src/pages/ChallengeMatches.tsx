import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Modal from "react-modal";

Modal.setAppElement("#root");

type Match = {
  id: string;
  challenge_id: string;
  scheduled_at: string;
  status: string;
  score?: string;
};

export default function ChallengeMatches() {
  const { challengeId } = useParams();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ scheduled_at: "", score: "", status: "pending" });
  const [editMatchId, setEditMatchId] = useState<string | null>(null);

  useEffect(() => {
    const safeFetch = async () => {
      if (!challengeId) {
        console.warn("Invalid challengeId");
        setLoading(false);
        return;
      }

      try {
        await fetchMatches();
      } catch (err) {
        console.error("Failed to fetch matches", err);
        setLoading(false);
      }
    };

    safeFetch();
  }, [challengeId, sortAsc, filterStatus]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("matches")
        .select("*")
        .eq("challenge_id", challengeId);

      if (filterStatus) {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;
      if (error) throw error;

      const sorted = [...data].sort((a, b) =>
        sortAsc
          ? new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
          : new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
      );
      setMatches(sorted);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (match?: Match) => {
    if (match) {
      setFormData({
        scheduled_at: match.scheduled_at,
        score: match.score || "",
        status: match.status,
      });
      setEditMatchId(match.id);
    } else {
      setFormData({ scheduled_at: "", score: "", status: "pending" });
      setEditMatchId(null);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!challengeId) return;

    if (editMatchId) {
      await supabase.from("matches").update(formData).eq("id", editMatchId);
    } else {
      await supabase.from("matches").insert([{ ...formData, challenge_id: challengeId }]);
    }
    closeModal();
    fetchMatches();
  };

  const toggleSort = () => setSortAsc(!sortAsc);

  return (
    <div>
      <h3>Matches for Challenge</h3>
      <p>Challenge ID: {challengeId || "Invalid"}</p>
      <button onClick={() => openModal()}>Add Match</button>
      <div>
        <label>Filter by Status: </label>
        <select onChange={(e) => setFilterStatus(e.target.value || null)} value={filterStatus || ""}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <table border={1} cellPadding={6} style={{ marginTop: "1em" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={toggleSort} style={{ cursor: "pointer" }}>
                Scheduled At {sortAsc ? "↑" : "↓"}
              </th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>{match.id}</td>
                <td>{new Date(match.scheduled_at).toLocaleString()}</td>
                <td>{match.status}</td>
                <td>{match.score || "-"}</td>
                <td>
                  <button onClick={() => openModal(match)}>Edit</button>{" "}
                  <button
                    onClick={async () => {
                      await supabase.from("matches").update({ status: "completed" }).eq("id", match.id);
                      fetchMatches();
                    }}
                  >
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Edit Match">
        <h2>{editMatchId ? "Edit Match" : "Add Match"}</h2>
        <label>Scheduled At:</label>
        <input
          type="datetime-local"
          value={formData.scheduled_at}
          onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
        />
        <br />
        <label>Score:</label>
        <input
          type="text"
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
        />
        <br />
        <label>Status:</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <button onClick={handleSubmit}>{editMatchId ? "Update" : "Create"}</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}


