// Isaiah Jones site JS
(() => {
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // mobile menu
  const nav = $(".nav");
  const menuBtn = $("#menuBtn");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("mobileOpen");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$(".navlink").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("mobileOpen");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  // active nav on scroll
  const links = $$(".navlink");
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    links.forEach(a => {
      const isActive = a.getAttribute("href") === "#" + current;
      a.classList.toggle("active", isActive);
    });
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // copy message helper (GitHub Pages friendly)
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();

      const text =
`Name: ${name}
Email: ${email}

Message:
${message}

Instagram: @i.jones_
Email: isaiah0joness@gmail.com`;

      try {
        await navigator.clipboard.writeText(text);
        const btn = form.querySelector("button[type='submit']");
        if (btn) {
          const old = btn.textContent;
          btn.textContent = "Copied ✅";
          setTimeout(() => (btn.textContent = old), 1500);
        }
      } catch {
        alert("Could not copy automatically. You can manually copy your message.");
      }
    });
  }

  // sparkles (smaller + clean)
  const canvas = document.getElementById("sparkles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  const DPR = Math.min(2, window.devicePixelRatio || 1);
  let W = 0, H = 0;

  function resize(){
    W = Math.floor(window.innerWidth);
    H = Math.floor(window.innerHeight);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const rnd = (a,b) => a + Math.random()*(b-a);

  const sparkles = Array.from({length: 70}, () => ({
    x: rnd(0, W),
    y: rnd(0, H),
    r: rnd(0.8, 2.2),     // SMALLER sparkles
    vx: rnd(-0.10, 0.10),
    vy: rnd(0.05, 0.22),
    a: rnd(0.10, 0.26)
  }));

  function draw(){
    ctx.clearRect(0,0,W,H);

    for (const s of sparkles){
      s.x += s.vx;
      s.y += s.vy;

      if (s.y > H + 20) { s.y = -20; s.x = rnd(0,W); }
      if (s.x < -20) s.x = W + 20;
      if (s.x > W + 20) s.x = -20;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(42,167,255,${s.a})`;
      ctx.fill();

      // tiny glint
      ctx.beginPath();
      ctx.arc(s.x + s.r*0.6, s.y - s.r*0.6, Math.max(0.6, s.r*0.5), 0, Math.PI*2);
      ctx.fillStyle = `rgba(77,214,255,${Math.min(0.30, s.a + 0.08)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
