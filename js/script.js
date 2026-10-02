const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const searchInput = document.getElementById("careerSearch");
const filters = document.querySelectorAll(".filter");
const careerCards = document.querySelectorAll(".career-card");
const emptyState = document.getElementById("emptyState");

let currentFilter = "all";

function filterCareers() {
  const query = searchInput.value.toLowerCase().trim();
  let visible = 0;

  careerCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch = name.includes(query);
    const matchesFilter = currentFilter === "all" || category === currentFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  emptyState.style.display = visible === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterCareers);

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    filterCareers();
  });
});

const careerData = {
  "AI / ML Engineer": {
    score: "68%",
    skills: [
      ["Python", 80, "Strong foundation", "good-state"],
      ["DSA", 55, "Needs practice", "improve-state"],
      ["Statistics", 35, "Start learning", "start-state"],
      ["Machine Learning", 20, "Start learning", "start-state"]
    ],
    next: "Build a strong foundation in Statistics."
  },
  "Full-Stack Developer": {
    score: "72%",
    skills: [
      ["HTML / CSS", 90, "Strong foundation", "good-state"],
      ["JavaScript", 70, "Good progress", "good-state"],
      ["Backend", 48, "Needs practice", "improve-state"],
      ["SQL", 35, "Start learning", "start-state"]
    ],
    next: "Practice building a complete CRUD application."
  },
  "Data Analyst": {
    score: "61%",
    skills: [
      ["Excel", 78, "Strong foundation", "good-state"],
      ["SQL", 55, "Needs practice", "improve-state"],
      ["Statistics", 42, "Needs practice", "improve-state"],
      ["Power BI", 28, "Start learning", "start-state"]
    ],
    next: "Build your first interactive dashboard."
  },
  "Cloud Engineer": {
    score: "54%",
    skills: [
      ["Linux", 62, "Good progress", "good-state"],
      ["Networking", 48, "Needs practice", "improve-state"],
      ["AWS", 32, "Start learning", "start-state"],
      ["Docker", 20, "Start learning", "start-state"]
    ],
    next: "Learn cloud fundamentals and deploy a small app."
  }
};

const careerSelect = document.getElementById("careerSelect");
const analyzeBtn = document.getElementById("analyzeBtn");
const dashboardCareer = document.getElementById("dashboardCareer");
const readinessScore = document.getElementById("readinessScore");
const skillRows = document.querySelectorAll(".skill-row");
const dashboardFooter = document.querySelector(".dashboard-footer p");

function updateDashboard(career) {
  const data = careerData[career];
  dashboardCareer.textContent = career;
  readinessScore.textContent = data.score;

  skillRows.forEach((row, index) => {
    const skill = data.skills[index];
    const name = row.querySelector("div:first-child span");
    const percent = row.querySelector("div:first-child b");
    const bar = row.querySelector(".dashboard-bar i");
    const state = row.querySelector(".skill-state");

    name.textContent = skill[0];
    percent.textContent = skill[1] + "%";
    bar.style.width = skill[1] + "%";
    state.textContent = skill[2];
    state.className = "skill-state " + skill[3];
  });

  dashboardFooter.innerHTML = "<b>Your next focus:</b> " + data.next;
}

analyzeBtn.addEventListener("click", () => {
  updateDashboard(careerSelect.value);

  document.querySelector(".skill-dashboard").animate(
    [
      { transform: "scale(.98)", opacity: .75 },
      { transform: "scale(1)", opacity: 1 }
    ],
    { duration: 350, easing: "ease-out" }
  );
});

document.querySelectorAll(".learn-link").forEach(link => {
  link.addEventListener("click", () => {
    const career = link.dataset.career;

    if (careerData[career]) {
      careerSelect.value = career;
      updateDashboard(career);
    }
  });
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.background = "rgba(251,250,252,.88)";
    navbar.style.backdropFilter = "blur(14px)";
  } else {
    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
  }
});
