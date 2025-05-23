import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email/password sign in
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/");
  }

  // Handle social login
  async function handleProvider(provider: "google" | "facebook" | "apple") {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
    setLoading(false);
    // OAuth will redirect, no navigate needed
  }

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", padding: 32, background: "#fff", borderRadius: 12 }}>
      <h2>Sign in to Tennis Community App</h2>
      <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 10, fontWeight: "bold" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <hr style={{ margin: "24px 0" }} />
      <div>
        <button onClick={() => handleProvider("google")} style={{ padding: 10, marginBottom: 8, width: "100%" }}>
          Sign in with Google
        </button>
        <button onClick={() => handleProvider("facebook")} style={{ padding: 10, marginBottom: 8, width: "100%" }}>
          Sign in with Facebook
        </button>
        <button onClick={() => handleProvider("apple")} style={{ padding: 10, width: "100%" }}>
          Sign in with Apple
        </button>
      </div>
    </div>
  );
}

