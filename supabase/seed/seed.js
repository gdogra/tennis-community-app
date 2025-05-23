/*
 * Usage:
 *   1. Fill SERVICE_ROLE_KEY below with your service role secret.
 *   2. Run: node supabase/seed/seed.js
 */

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://gygkyqdmrkojskvdjsrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Z2t5cWRtcmtvanNrdmRqc3J4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg1MTYwNCwiZXhwIjoyMDYzNDI3NjA0fQ.RlhckCwWqG6uJrYw7Mvbg1crDh7X5AqfPUv2TEYVsZE'
);

const skills = ["3.6", "4.0", "4.5", "5.0"];
const names = [
  "Alex Johnson","Samantha Lee","John Smith","Maria Lopez","Kevin Patel",
  "Emily Zhang","Michael Brown","Linda Garcia","Chris Wilson","Jessica Kim",
  "Daniel Young","Rebecca Hall","Eric Wright","Natalie Clark","Adam Turner",
  "Tina Martinez","Henry Adams","Sarah Perez","George Baker","Monica Evans"
];

const playerPassword = "testpass123";

async function seedPlayers() {
  for (let i = 0; i < 20; i++) {
    const email = `player${i + 1}@test.com`;
    const { data: user, error } = await supabase.auth.admin.createUser({
      email,
      password: playerPassword,
      email_confirm: true
    });
    if (error) {
      console.log("User error", error, email);
      continue;
    }
    const userId = user.user.id;
    await supabase.from("profiles").insert({
      id: userId,
      username: names[i].toLowerCase().replace(" ", "_"),
    bio: `I am ${names[i]}`,
    avatar_url: "",
      metadata: {}
    });
    await supabase.from("players").insert({
      id: userId,
      name: names[i],
      skill_level: skills[i % skills.length],
      points: 0
    });
    console.log(`Seeded player: ${names[i]}`);

  }
}

async function seedAdmin() {
  const email = "admin@tennisapp.com";
  const password = "AdminPass2024!";
  let { data: user, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });
  if (error) {
    console.log("Admin user error", error);
    return;
  }
  const userId = user.user.id;
  await supabase.from("profiles").insert({
    id: userId,
    username: "admin",
    bio: "Site administrator",
    avatar_url: "",
    metadata: { role: "admin" }
  });
  await supabase.from("players").insert({
    id: userId,
    name: "Admin User",
    skill_level: "5.0",
    points: 0
  });
  console.log("Seeded admin user");
}

async function main() {
  await seedPlayers();
  await seedAdmin();
  console.log("All seeding done.");
}

main();
