import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">🎾 Welcome to the Tennis Community App</h1>
      <ul className="mt-6 space-y-2">
        <li><a href="/leaderboard" className="text-blue-600 underline">Leaderboard</a></li>
        <li><a href="/challenge" className="text-blue-600 underline">Propose Challenge</a></li>
        <li><a href="/my-challenges" className="text-blue-600 underline">My Challenges</a></li>
        <li><a href="/profile" className="text-blue-600 underline">Profile</a></li>
      </ul>
    </div>
  );
}

