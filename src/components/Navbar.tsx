// src/components/Navbar.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, isAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const collapseMenuAnd = (callback) => {
    setMenuOpen(false);
    callback();
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link to="/" className="text-xl font-bold">
        🏠 Home
      </Link>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden border p-1"
      >
        ☰
      </button>
      <ul className={`sm:flex space-x-4 ${menuOpen ? "block" : "hidden"} sm:block`}>
        {isAdmin && (
          <>
            <li><Link to="/admin" onClick={() => setMenuOpen(false)}>🛠️ Admin</Link></li>
            <li><Link to="/admin/players" onClick={() => setMenuOpen(false)}>👥 Players</Link></li>
            <li><Link to="/admin/tournaments" onClick={() => setMenuOpen(false)}>🏆 Tournaments</Link></li>
            <li><Link to="/admin/matches" onClick={() => setMenuOpen(false)}>🎯 Matches</Link></li>
          </>
        )}
        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link></li>
        <li><button onClick={handleLogout}>📋 Logout</button></li>
      </ul>
    </nav>
  );
}

