// ---------- Tab Navigation ----------
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const yearEl = document.getElementById("year");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

yearEl.textContent = new Date().getFullYear();

function setActiveTab(tabName) {
  tabs.forEach(t => {
    const isMatch = t.dataset.tab === tabName;
    t.classList.toggle("is-active", isMatch);
    t.setAttribute("aria-selected", isMatch ? "true" : "false");
  });

  panels.forEach(p => {
    p.classList.toggle("is-active", p.dataset.panel === tabName);
  });

  if (navMenu.classList.contains("is-open")) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  const activePanel = document.querySelector(`.panel[data-panel="${tabName}"]`);
  if (activePanel) activePanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab]");
  if (!btn) return;
  const tabName = btn.dataset.tab;
  if (!tabName) return;
  setActiveTab(tabName);
});

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// ---------- Contact Form (mailto) ----------
const form = document.getElementById("contactForm");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const DEST_EMAIL = "isaiah0joness@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = (data.get("name") || "").toString().trim();
  const interest = (data.get("interest") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();
  const connection = (data.get("connection") || "").toString().trim();

  const subject = encodeURIComponent(`Coaching Inquiry — ${interest || "Info"}`);
  const body = encodeURIComponent(
`Name: ${name}
Interested in: ${interest}

Message (questions or concerns):
${message}

Encounter/Connection (if available):
${connection || "N/A"}`
  );

  window.location.href = `mailto:${DEST_EMAIL}?subject=${subject}&body=${body}`;
});

// Copy email
copyEmailBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(DEST_EMAIL);
    const old = copyEmailBtn.textContent;
    copyEmailBtn.textContent = "Copied!";
    setTimeout(() => (copyEmailBtn.textContent = old), 1200);
  } catch {
    const old = copyEmailBtn.textContent;
    copyEmailBtn.textContent = "Copy failed";
    setTimeout(() => (copyEmailBtn.textContent = old), 1200);
  }
});

// ---------- Subtle stars canvas ----------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let w, h, stars;

function resize() {
  w = canvas.width = window.innerWidth * devicePixelRatio;
  h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (Math.random() * 1.5 + 0.35) * devicePixelRatio,
    a: Math.random() * 0.22 + 0.05,
    vx: (Math.random() * 0.12 + 0.02) * devicePixelRatio,
  }));
}
window.addEventListener("resize", resize);
resize();

function tick() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    s.x += s.vx;
    if (s.x > w + 20) s.x = -20;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(7,34,63,${s.a})`;
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();
