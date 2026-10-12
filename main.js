// Ambient 3D Particle/Mesh Canvas (Ultra-clean, zero AI-slop, kinetic physics)
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 13000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.28 + 0.12
    });
  }
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
});

function animate() {
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;

  ctx.clearRect(0, 0, width, height);

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const particleColor = isLight ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, ';
  const lineColor = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)';

  // Draw subtle connection lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 115) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  // Draw particles
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // Mouse gentle repulsion
    const mdx = p.x - mouse.x;
    const mdy = p.y - mouse.y;
    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
    if (mdist < 150) {
      const force = (150 - mdist) / 150;
      p.x += (mdx / mdist) * force * 1.8;
      p.y += (mdy / mdist) * force * 1.8;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = particleColor + p.alpha + ')';
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

resize();
animate();

// Intersection Observer for Smooth Scroll Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Interactive 3D Card Tilt for Portrait with Realistic Kinetic Physics
const portraitCard = document.querySelector('.portrait-card');
if (portraitCard) {
  portraitCard.addEventListener('mousemove', (e) => {
    const rect = portraitCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    portraitCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
  });

  portraitCard.addEventListener('mouseleave', () => {
    portraitCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// Interactive 3D Tilt for Featured Project Cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// Theme Toggle (Light / Dark)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('kevin-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('kevin-theme', next);
});

// Modal Zoom for Case Study Sheets
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-btn-sheet').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-card');
    if (!card) return;

    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const img = card.getAttribute('data-modal-img');

    if (modal && modalImg && modalTitle && modalDesc) {
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Escape key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Smooth active link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Internationalization (i18n: EN / ID / ZH)
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.querySelector('.lang-dropdown');
const langCurrentLabel = document.getElementById('lang-current-label');
const langOpts = document.querySelectorAll('.lang-opt');

const langLabels = {
  en: 'EN',
  id: 'ID',
  zh: 'ZH'
};

function setLanguage(lang, isManual = false) {
  if (!window.i18nData) {
    // Retry shortly if i18n script is still parsing
    setTimeout(() => setLanguage(lang, isManual), 50);
    return;
  }

  const dict = window.i18nData[lang];
  if (!dict) return;

  document.documentElement.setAttribute('lang', lang);

  // Update text elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update button label and active states
  const labelEl = document.getElementById('lang-current-label');
  if (labelEl) {
    labelEl.textContent = langLabels[lang] || 'EN';
  }

  document.querySelectorAll('.lang-opt').forEach(opt => {
    if (opt.getAttribute('data-lang') === lang) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  if (isManual) {
    localStorage.setItem('kevin-lang-manual', lang);
  }
}

// Global click delegation for language toggle and options
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('#lang-toggle');
  const dropdown = document.querySelector('.lang-dropdown');
  const optBtn = e.target.closest('.lang-opt');

  if (toggleBtn && dropdown) {
    e.stopPropagation();
    dropdown.classList.toggle('active');
    return;
  }

  if (optBtn) {
    e.stopPropagation();
    const lang = optBtn.getAttribute('data-lang');
    if (lang) {
      setLanguage(lang, true);
    }
    if (dropdown) dropdown.classList.remove('active');
    return;
  }

  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Geolocation-Based Language Detection
async function detectDefaultLanguage() {
  // If user explicitly chose a language previously via navbar dropdown, respect it
  const manualChoice = localStorage.getItem('kevin-lang-manual');
  if (manualChoice && (manualChoice === 'en' || manualChoice === 'id' || manualChoice === 'zh')) {
    setLanguage(manualChoice, false);
    return;
  }

  // 1. Timezone heuristic (instant, 100% accurate for device location, zero network wait)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Jakarta') || tz.includes('Pontianak') || tz.includes('Makassar') || tz.includes('Jayapura')) {
      setLanguage('id', false);
      return;
    }
    if (tz.includes('Shanghai') || tz.includes('Urumqi') || tz.includes('Beijing') || tz.includes('Hong_Kong') || tz.includes('Taipei')) {
      setLanguage('zh', false);
      return;
    }
  } catch (e) {}

  // 2. Browser language heuristic (instant)
  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const bl of browserLangs) {
    const l = (bl || '').toLowerCase();
    if (l.startsWith('id')) {
      setLanguage('id', false);
      return;
    }
    if (l.startsWith('zh')) {
      setLanguage('zh', false);
      return;
    }
  }

  // 3. Network IP Geolocation lookup
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://api.country.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const country = (data.country || '').toUpperCase();
      if (country === 'ID') {
        setLanguage('id', false);
        return;
      }
      if (country === 'CN' || country === 'HK' || country === 'TW') {
        setLanguage('zh', false);
        return;
      }
      setLanguage('en', false);
      return;
    }
  } catch (err) {
    try {
      const res2 = await fetch('https://ipwho.is/?fields=country_code');
      if (res2.ok) {
        const data2 = await res2.json();
        const country2 = (data2.country_code || '').toUpperCase();
        if (country2 === 'ID') {
          setLanguage('id', false);
          return;
        }
        if (country2 === 'CN' || country2 === 'HK' || country2 === 'TW') {
          setLanguage('zh', false);
          return;
        }
      }
    } catch (e2) {}
  }

  // Default fallback for international viewers
  setLanguage('en', false);
}

// Initialize Language on Page Load & DOMContentLoaded
detectDefaultLanguage();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectDefaultLanguage);
}



