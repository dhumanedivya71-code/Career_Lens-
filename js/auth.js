import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const configured = !SUPABASE_URL.includes("YOUR_") && !SUPABASE_ANON_KEY.includes("YOUR_");
const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const nameInput = document.getElementById("name");
const nameLabel = document.getElementById("nameLabel");
const form = document.getElementById("authForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
let mode = new URLSearchParams(location.search).get("mode") === "signup" ? "signup" : "login";

function setMode(next) {
  mode = next;
  const signup = mode === "signup";
  loginTab.classList.toggle("active", !signup);
  signupTab.classList.toggle("active", signup);
  nameInput.hidden = !signup;
  nameLabel.hidden = !signup;
  nameInput.required = signup;
  submitBtn.textContent = signup ? "Create account" : "Login";
  message.className = "msg";
}

function showMessage(text, ok=false) {
  message.textContent = text;
  message.className = "msg show";
  message.style.background = ok ? "#e9f9ef" : "#fff0f0";
  message.style.color = ok ? "#176b39" : "#9b2226";
}

loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabase) {
    showMessage("Supabase is not configured yet. Add your Supabase URL and publishable/anon key in js/config.js.");
    return;
  }
  submitBtn.disabled = true;
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (mode === "signup") {
      const name = nameInput.value.trim();
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: { full_name: name } }
      });
      if (error) throw error;
      if (data.session) {
        location.href = "dashboard.html";
      } else {
        showMessage("Account created. Check your email if confirmation is enabled, then log in.", true);
        setMode("login");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      location.href = "dashboard.html";
    }
  } catch (error) {
    showMessage(error.message || "Something went wrong.");
  } finally {
    submitBtn.disabled = false;
  }
});

setMode(mode);
