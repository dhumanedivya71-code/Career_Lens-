import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const configured = !SUPABASE_URL.includes("YOUR_") && !SUPABASE_ANON_KEY.includes("YOUR_");
if (!configured) {
  document.getElementById("errorBox").hidden = false;
  document.getElementById("errorBox").textContent = "Supabase is not configured. Add your credentials in js/config.js.";
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { location.href = "auth.html"; }
  else {
    const user = session.user;
    document.getElementById("userName").textContent = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";
    const { data: profile } = await supabase.from("profiles").select("selected_career").eq("id", user.id).maybeSingle();
    if (profile?.selected_career) document.getElementById("careerName").textContent = profile.selected_career;
  }
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.href = "auth.html";
  });
}
