// src/App.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyChallenges from "./pages/MyChallenges";
import ProposeChallenge from "./pages/ProposeChallenge";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import AdminPlayers from "./pages/AdminPlayers";
import AdminTournaments from "./pages/AdminTournaments";
import AdminMatches from "./pages/AdminMatches";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabaseClient";

const ADMIN_EMAILS = ["admin@tennisapp.com"];

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      console.log("[Auth] Checking user...");
      const { data: userData, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error("[Auth error]:", authError);
        setLoading(false);
        return;
      }

      const user = userData?.user || null;
      setUser(user);
      console.log("[Auth] User:", user);

      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("[Profile fetch error]:", profileError);
        }

        if (!profileData) {
          console.log("[Profile] Creating profile...");
          const { error: insertError } = await supabase.from("profiles").insert({
            id: user.id,
            username: user.email.split("@")[0],
            bio: "Auto-created profile",
            role: ADMIN_EMAILS.includes(user.email) ? "admin" : "player",
          });

          if (insertError) {
            console.error("[Profile insert error]:", insertError);
          }
        }

        setProfile(profileData || null);
      }

      setLoading(false);
    };

    fetchUserAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, _session) => {
      fetchUserAndProfile();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  if (loading) return <div className="p-8 text-center text-lg">Loading... (check console)</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {!isLoginPage && <Navbar user={user} isAdmin={isAdmin} />}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to={isAdmin ? "/admin" : "/dashboard"} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/my-challenges" element={user ? <MyChallenges user={user} /> : <Navigate to="/login" />} />
          <Route path="/challenge" element={!isAdmin && user ? <ProposeChallenge user={user} /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile user={user} profile={profile} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel user={user} /> : <Navigate to="/" />} />
          <Route path="/admin/players" element={isAdmin ? <AdminPlayers /> : <Navigate to="/" />} />
          <Route path="/admin/tournaments" element={isAdmin ? <AdminTournaments /> : <Navigate to="/" />} />
          <Route path="/admin/matches" element={isAdmin ? <AdminMatches /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div className="text-center mt-20">404 - Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

