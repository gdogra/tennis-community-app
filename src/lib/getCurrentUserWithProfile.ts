// src/lib/getCurrentUserWithProfile.ts
import { supabase } from "./supabaseClient";

export async function getCurrentUserWithProfile() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (!user || userError) return { user: null, profile: null };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile };
}

