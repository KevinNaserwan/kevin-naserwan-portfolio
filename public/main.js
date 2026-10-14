// Safe Storage Helpers to prevent any uncaught DOMException/SecurityError
function safeGetStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

// Global Drawer Controls (Exposed to window immediately for instant click availability)
function openMenuDrawer() {
  const drawer = document.getElementById('menu-drawer');
  if (drawer) {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenuDrawer() {
  const drawer = document.getElementById('menu-drawer');
  if (drawer) {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

window.openMenuDrawer = openMenuDrawer;
window.closeMenuDrawer = closeMenuDrawer;

// Ambient 3D Particle/Mesh Canvas (Ultra-clean, zero AI-slop, kinetic physics)
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

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

// Interactive 3D Tilt for Project, Stat, and Language Cards
document.querySelectorAll('.project-card, .stat-card, .lang-card').forEach(card => {
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

const savedTheme = safeGetStorage('kevin-theme', 'dark');
if (root) root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    safeSetStorage('kevin-theme', next);
  });
}

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

// Global Click Delegation to guarantee menu button clickability across all viewports
document.addEventListener('click', (e) => {
  // Menu bar button click
  const menuBtn = e.target.closest('#menu-bar-btn');
  if (menuBtn) {
    e.preventDefault();
    e.stopPropagation();
    openMenuDrawer();
    return;
  }

  // Close button click
  const closeBtn = e.target.closest('#menu-close-btn');
  if (closeBtn) {
    e.preventDefault();
    closeMenuDrawer();
    return;
  }

  // Backdrop click
  const backdrop = e.target.closest('#menu-backdrop');
  if (backdrop) {
    e.preventDefault();
    closeMenuDrawer();
    return;
  }

  // Drawer nav item or navbar link click
  const navItem = e.target.closest('.nav-link, [data-drawer-nav]');
  if (navItem) {
    closeMenuDrawer();
    const href = navItem.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const topOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
});

// Escape key to close modal or drawer
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (menuDrawer && menuDrawer.classList.contains('active')) {
      closeMenuDrawer();
    }
  }
});

// Projects Category Filtering & Responsive Pagination
function initProjectsFilterAndPagination() {
  const filterBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const paginationContainer = document.getElementById('projects-pagination');
  const pageNumbersContainer = document.getElementById('page-numbers');
  const prevBtn = document.getElementById('page-prev');
  const nextBtn = document.getElementById('page-next');

  if (!projectCards.length || !paginationContainer) return;

  let currentCategory = 'all';
  let currentPage = 1;
  const itemsPerPage = 4;

  function renderProjects() {
    // 1. Filter cards
    const filteredCards = projectCards.filter(card => {
      const category = card.getAttribute('data-category');
      return currentCategory === 'all' || category === currentCategory;
    });

    const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // 2. Hide all cards first, then show current page slice
    projectCards.forEach(card => {
      card.style.display = 'none';
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleCards = filteredCards.slice(startIndex, endIndex);

    visibleCards.forEach(card => {
      card.style.display = 'flex';
    });

    // 3. Render pagination
    if (filteredCards.length <= itemsPerPage) {
      paginationContainer.style.display = 'none';
    } else {
      paginationContainer.style.display = 'flex';
    }

    if (pageNumbersContainer) {
      pageNumbersContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const numBtn = document.createElement('button');
        numBtn.className = `page-num ${i === currentPage ? 'active' : ''}`;
        numBtn.textContent = i;
        numBtn.addEventListener('click', () => {
          currentPage = i;
          renderProjects();
          scrollToProjects();
        });
        pageNumbersContainer.appendChild(numBtn);
      }
    }

    if (prevBtn) {
      prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage === totalPages;
    }
  }

  function scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const topPos = projectsSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  }

  // Filter tab click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      currentPage = 1;
      renderProjects();
    });
  });

  // Prev / Next click handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProjects();
        scrollToProjects();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentPage++;
      renderProjects();
      scrollToProjects();
    });
  }

  // Initial render
  renderProjects();
}

initProjectsFilterAndPagination();

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

// Base Rate Values in IDR (Kevin's baseline)
const BASE_RATES_IDR = {
  t1_hourly: 150000,
  t2_proj_min: 10000000,
  t2_proj_max: 35000000,
  t3_sprint_min: 6000000,
  t3_sprint_max: 8000000
};

// Cached exchange rates (defaults to market baseline 1 USD = 17,893 IDR, 1 USD = 6.70 CNY)
let liveExchangeRates = {
  USD: 1 / 17893.30,
  CNY: 6.7003 / 17893.30
};

// Fetch real-time exchange rates in the background
async function fetchLiveExchangeRates() {
  try {
    const cached = localStorage.getItem('kevin-rates-cache');
    const cachedTime = localStorage.getItem('kevin-rates-time');
    // Cache for 6 hours
    if (cached && cachedTime && (Date.now() - parseInt(cachedTime)) < 6 * 3600 * 1000) {
      liveExchangeRates = JSON.parse(cached);
      return;
    }

    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.IDR) {
        const idrRate = data.rates.IDR;
        const cnyRate = data.rates.CNY || 6.70;
        liveExchangeRates = {
          USD: 1 / idrRate,
          CNY: cnyRate / idrRate
        };
        localStorage.setItem('kevin-rates-cache', JSON.stringify(liveExchangeRates));
        localStorage.setItem('kevin-rates-time', Date.now().toString());

        // Refresh current active view with newly fetched live exchange rates
        const currentLang = document.documentElement.getAttribute('lang') || 'id';
        if (currentLang !== 'id') {
          updateDynamicRateAmounts(currentLang);
        }
      }
    }
  } catch (err) {
    // Graceful fallback to default baseline
  }
}

function updateDynamicRateAmounts(lang) {
  const t1AmountEl = document.querySelector('[data-i18n="rates.t1_rate_amount"]');
  const t2AmountEl = document.querySelector('[data-i18n="rates.t2_rate_amount"]');
  const t3AmountEl = document.querySelector('[data-i18n="rates.t3_rate_amount"]');

  if (!t1AmountEl || !t2AmountEl || !t3AmountEl) return;

  if (lang === 'en') {
    // International market standard calibration:
    // Software engineering advisory internationally typically benchmarks at ~$15 – $20/hr
    const rateUsd = liveExchangeRates.USD || (1 / 17893.30);
    const hourlyUsd = Math.max(15, Math.round(BASE_RATES_IDR.t1_hourly * rateUsd * 1.8));
    const projMinUsd = Math.round((BASE_RATES_IDR.t2_proj_min * rateUsd * 1.5) / 50) * 50;
    const projMaxUsd = Math.round((BASE_RATES_IDR.t2_proj_max * rateUsd * 1.5) / 50) * 50;
    const sprintMinUsd = Math.round((BASE_RATES_IDR.t3_sprint_min * rateUsd * 1.6) / 10) * 10;
    const sprintMaxUsd = Math.round((BASE_RATES_IDR.t3_sprint_max * rateUsd * 1.6) / 10) * 10;

    t1AmountEl.textContent = `$${hourlyUsd}`;
    t2AmountEl.textContent = `$${projMinUsd.toLocaleString()} – $${projMaxUsd.toLocaleString()}`;
    t3AmountEl.textContent = `$${sprintMinUsd.toLocaleString()} – $${sprintMaxUsd.toLocaleString()}`;
  } else if (lang === 'zh') {
    // East Asia market calibration:
    const rateCny = liveExchangeRates.CNY || (6.7003 / 17893.30);
    const hourlyCny = Math.max(80, Math.round(BASE_RATES_IDR.t1_hourly * rateCny * 1.4));
    const projMinCny = Math.round((BASE_RATES_IDR.t2_proj_min * rateCny * 1.3) / 100) * 100;
    const projMaxCny = Math.round((BASE_RATES_IDR.t2_proj_max * rateCny * 1.3) / 100) * 100;
    const sprintMinCny = Math.round((BASE_RATES_IDR.t3_sprint_min * rateCny * 1.3) / 100) * 100;
    const sprintMaxCny = Math.round((BASE_RATES_IDR.t3_sprint_max * rateCny * 1.3) / 100) * 100;

    t1AmountEl.textContent = `¥${hourlyCny}`;
    t2AmountEl.textContent = `¥${projMinCny.toLocaleString()} – ¥${projMaxCny.toLocaleString()}`;
    t3AmountEl.textContent = `¥${sprintMinCny.toLocaleString()} – ¥${sprintMaxCny.toLocaleString()}`;
  }
}

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

  // Calculate and apply dynamic live currency rates
  if (lang !== 'id') {
    updateDynamicRateAmounts(lang);
  }

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

function animateCount(el, start, end, duration = 1200, suffix = '+') {
  if (!el) return;
  const startTime = performance.now();
  function step(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const currentVal = Math.floor(start + (end - start) * easeProgress);
    el.textContent = currentVal + (suffix || '');
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = end + (suffix || '');
    }
  }
  requestAnimationFrame(step);
}

// Real-time GitHub Telemetry & Stats Fetcher with 15-Minute Cache
async function fetchGitHubRealtimeStats() {
  const reposEl = document.getElementById('stat-github-repos');
  const starsEl = document.getElementById('stat-github-stars');

  if (!reposEl && !starsEl) return;

  const CACHE_KEY = 'kevin-gh-telemetry-cache';
  const TTL = 15 * 60 * 1000; // 15 minutes

  // 1. Check Local Storage Cache first to avoid hitting GitHub API rate limits (60 req/hr)
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < TTL) {
        if (reposEl && parsed.repos != null) animateCount(reposEl, 0, parsed.repos, 900, '+');
        if (starsEl && parsed.stars != null) animateCount(starsEl, 0, parsed.stars, 900, '+');
        return;
      }
    }
  } catch (e) {}

  // 2. Fetch fresh telemetry from GitHub API
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/KevinNaserwan', { signal: controller.signal }),
      fetch('https://api.github.com/users/KevinNaserwan/repos?per_page=100', { signal: controller.signal })
    ]);
    clearTimeout(timeout);

    let publicRepos = 63;
    let totalStars = 39;

    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === 'number') {
        publicRepos = userData.public_repos;
      }
    }

    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (Array.isArray(reposData)) {
        totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
      }
    }

    // Cache the fresh results
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        repos: publicRepos,
        stars: totalStars
      }));
    } catch (e) {}

    // Animate numbers smoothly
    if (reposEl) animateCount(reposEl, 0, publicRepos, 1200, '+');
    if (starsEl) animateCount(starsEl, 0, totalStars, 1200, '+');

  } catch (err) {
    // Graceful fallback to verified numbers
    if (reposEl) reposEl.textContent = '63+';
    if (starsEl) starsEl.textContent = '39+';
  }
}

// Real-time GitHub Commit Activity & Bulletproof Year Switcher (GitHub Style)
const GH_YEAR_TOTALS = {
  '2026': 251,
  '2025': 80,
  '2024': 352,
  '2023': 134
};

const GH_ACTIVE_DAYS = {
  "2026-01-06": [1, 1], "2026-01-07": [2, 1], "2026-02-03": [3, 1], "2026-02-26": [7, 2], "2026-03-09": [1, 1], "2026-08-13": [2, 1], "2026-08-18": [70, 4], "2026-09-30": [10, 2], "2026-10-01": [6, 2], "2026-10-11": [27, 4], "2026-10-12": [91, 4], "2026-10-13": [20, 4], "2026-10-14": [11, 3],
  "2025-02-16": [1, 1], "2025-02-24": [1, 1], "2025-03-02": [8, 4], "2025-03-03": [3, 3], "2025-03-04": [5, 4], "2025-06-27": [5, 4], "2025-06-28": [2, 2], "2025-07-22": [3, 3], "2025-11-11": [2, 2], "2025-11-17": [12, 4], "2025-11-18": [2, 2], "2025-11-21": [4, 4], "2025-11-24": [2, 2], "2025-11-26": [2, 2], "2025-12-14": [20, 4], "2025-12-15": [4, 4], "2025-12-16": [1, 1], "2025-12-19": [3, 3],
  "2024-01-07": [10, 3], "2024-01-31": [2, 1], "2024-02-01": [1, 1], "2024-02-07": [1, 1], "2024-02-08": [4, 2], "2024-02-10": [2, 1], "2024-02-11": [2, 1], "2024-02-12": [3, 1], "2024-02-13": [2, 1], "2024-02-16": [1, 1], "2024-02-18": [4, 2], "2024-02-20": [2, 1], "2024-04-08": [2, 1], "2024-04-10": [1, 1], "2024-04-28": [1, 1], "2024-05-05": [4, 2], "2024-05-11": [2, 1], "2024-05-13": [1, 1], "2024-05-17": [3, 1], "2024-05-18": [2, 1], "2024-05-19": [1, 1], "2024-05-30": [1, 1], "2024-06-01": [6, 2], "2024-06-06": [2, 1], "2024-06-08": [1, 1], "2024-06-09": [5, 2], "2024-06-10": [5, 2], "2024-06-11": [2, 1], "2024-06-12": [1, 1], "2024-06-13": [3, 1], "2024-06-14": [13, 4], "2024-06-17": [13, 4], "2024-06-18": [3, 1], "2024-06-22": [1, 1], "2024-07-06": [11, 3], "2024-07-12": [19, 4], "2024-07-14": [3, 1], "2024-07-15": [7, 2], "2024-07-18": [8, 3], "2024-07-19": [1, 1], "2024-07-21": [26, 4], "2024-07-22": [13, 4], "2024-07-23": [1, 1], "2024-07-25": [1, 1], "2024-07-27": [3, 1], "2024-07-28": [3, 1], "2024-07-29": [15, 4], "2024-07-30": [11, 3], "2024-08-01": [1, 1], "2024-08-02": [1, 1], "2024-08-03": [2, 1], "2024-08-04": [9, 3], "2024-08-05": [1, 1], "2024-08-11": [8, 3], "2024-08-15": [10, 3], "2024-08-16": [2, 1], "2024-08-17": [1, 1], "2024-08-18": [2, 1], "2024-08-19": [1, 1], "2024-09-05": [6, 2], "2024-09-06": [1, 1], "2024-09-07": [2, 1], "2024-09-09": [2, 1], "2024-09-13": [3, 1], "2024-09-14": [2, 1], "2024-09-15": [3, 1], "2024-09-16": [5, 2], "2024-09-30": [1, 1], "2024-10-01": [2, 1], "2024-10-05": [5, 2], "2024-10-06": [5, 2], "2024-10-26": [1, 1], "2024-10-30": [1, 1], "2024-10-31": [2, 1], "2024-11-02": [1, 1], "2024-11-03": [1, 1], "2024-11-05": [5, 2], "2024-11-14": [1, 1], "2024-11-23": [2, 1], "2024-11-24": [1, 1], "2024-11-25": [2, 1], "2024-11-26": [5, 2], "2024-11-27": [4, 2], "2024-11-30": [5, 2], "2024-12-03": [3, 1], "2024-12-05": [1, 1], "2024-12-09": [2, 1], "2024-12-11": [4, 2], "2024-12-12": [1, 1], "2024-12-21": [3, 1], "2024-12-22": [3, 1],
  "2023-02-26": [3, 1], "2023-03-03": [4, 2], "2023-03-04": [2, 1], "2023-03-05": [3, 1], "2023-03-07": [2, 1], "2023-03-08": [2, 1], "2023-03-09": [1, 1], "2023-03-10": [1, 1], "2023-03-11": [1, 1], "2023-03-13": [5, 2], "2023-03-15": [5, 2], "2023-03-17": [2, 1], "2023-03-18": [4, 2], "2023-03-19": [4, 2], "2023-03-20": [2, 1], "2023-03-21": [3, 1], "2023-03-24": [3, 1], "2023-03-28": [1, 1], "2023-03-29": [2, 1], "2023-03-30": [1, 1], "2023-04-21": [1, 1], "2023-04-22": [2, 1], "2023-05-10": [1, 1], "2023-06-22": [8, 3], "2023-06-25": [12, 4], "2023-06-26": [12, 4], "2023-06-27": [8, 3], "2023-07-11": [4, 2], "2023-07-12": [5, 2], "2023-07-13": [3, 1], "2023-07-17": [1, 1], "2023-07-18": [1, 1], "2023-07-19": [1, 1], "2023-07-20": [1, 1], "2023-09-20": [2, 1], "2023-10-15": [2, 1], "2023-10-30": [2, 1], "2023-10-31": [3, 1], "2023-11-01": [3, 1], "2023-11-02": [2, 1], "2023-11-25": [3, 1], "2023-11-27": [2, 1], "2023-12-03": [1, 1], "2023-12-04": [1, 1], "2023-12-09": [2, 1]
};

window.switchGitHubYear = function(year) {
  const yrStr = String(year);
  const gridEl = document.getElementById('gh-heatmap-grid');
  const totalCommitsEl = document.getElementById('gh-total-commits');
  const activePeriodLabelEl = document.getElementById('gh-active-period-label');
  const hoverInfoEl = document.getElementById('gh-hover-info');
  const scrollContainer = document.querySelector('.gh-graph-scroll');

  // 1. Highlight clicked tab in UI
  document.querySelectorAll('.gh-year-tab').forEach(tab => {
    if (tab.getAttribute('data-year') === yrStr) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  if (!gridEl) return;

  // 2. Generate calendar days for selected year
  const yrNum = parseInt(yrStr) || 2026;
  const isLeap = (yrNum % 4 === 0 && yrNum % 100 !== 0) || (yrNum % 400 === 0);
  const totalDays = isLeap ? 366 : 365;
  const startDate = new Date(Date.UTC(yrNum, 0, 1));
  const startDayOfWeek = startDate.getUTCDay(); // 0 (Sun) to 6 (Sat)

  gridEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  // Filler cells to align Jan 1 with its exact day of week
  for (let f = 0; f < startDayOfWeek; f++) {
    const filler = document.createElement('div');
    filler.className = 'gh-day-cell gh-day-filler';
    filler.style.visibility = 'hidden';
    filler.style.pointerEvents = 'none';
    fragment.appendChild(filler);
  }

  // Generate 365 (or 366) days
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const activeInfo = GH_ACTIVE_DAYS[dateStr];
    const count = activeInfo ? activeInfo[0] : 0;
    const lvl = activeInfo ? activeInfo[1] : 0;

    const cell = document.createElement('div');
    cell.className = `gh-day-cell lvl-${lvl}`;
    cell.setAttribute('data-date', dateStr);
    cell.setAttribute('data-count', String(count));

    const countText = count === 1 ? '1 contribution' : `${count} contributions`;
    const dateText = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    cell.title = `${countText} on ${dateText}`;

    cell.addEventListener('mouseenter', () => {
      if (hoverInfoEl) {
        hoverInfoEl.innerHTML = `<strong>${countText}</strong> on ${dateText}`;
      }
    });
    cell.addEventListener('mouseleave', () => {
      if (hoverInfoEl) {
        hoverInfoEl.textContent = 'Continuous daily shipping & microservice updates';
      }
    });

    fragment.appendChild(cell);
  }

  gridEl.appendChild(fragment);

  // Auto-scroll to latest contributions
  if (scrollContainer) {
    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
  }

  // Immediate number & label update (0ms delay)
  const total = (window.GH_YEAR_TOTALS || GH_YEAR_TOTALS)[yrStr] || 0;
  if (totalCommitsEl) {
    totalCommitsEl.textContent = total + '+';
    if (typeof animateCount === 'function') {
      animateCount(totalCommitsEl, 0, total, 600, '+');
    }
  }
  if (activePeriodLabelEl) {
    activePeriodLabelEl.textContent = yrStr;
  }
  if (hoverInfoEl) {
    hoverInfoEl.textContent = 'Continuous daily shipping & microservice updates';
  }
};

window.GH_YEAR_TOTALS = GH_YEAR_TOTALS;
window.GH_ACTIVE_DAYS = GH_ACTIVE_DAYS;

// Global event delegation for year filter tabs
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.gh-year-tab');
  if (btn) {
    const yr = btn.getAttribute('data-year');
    if (yr && typeof window.switchGitHubYear === 'function') {
      window.switchGitHubYear(yr);
    }
  }
});

// Real-time GitHub Commit Activity Initializer & Telemetry Sync
async function fetchGitHubCommitHeatmap() {
  const gridEl = document.getElementById('gh-heatmap-grid');
  const hoverInfoEl = document.getElementById('gh-hover-info');
  const scrollContainer = document.querySelector('.gh-graph-scroll');
  if (!gridEl) return;

  function bindCellHover(cell) {
    cell.addEventListener('mouseenter', () => {
      if (hoverInfoEl) {
        const count = cell.getAttribute('data-count') || '0';
        const date = cell.getAttribute('data-date') || '';
        const countText = count === '1' ? '1 contribution' : `${count} contributions`;
        let dateText = date;
        try {
          const d = new Date(date);
          dateText = isNaN(d.getTime()) ? date : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) {}
        hoverInfoEl.innerHTML = `<strong>${countText}</strong> on ${dateText}`;
      }
    });
    cell.addEventListener('mouseleave', () => {
      if (hoverInfoEl) {
        hoverInfoEl.textContent = 'Continuous daily shipping & microservice updates';
      }
    });
  }

  // 1. Immediately bind hover events to pre-rendered cells in DOM (0ms instant)
  gridEl.querySelectorAll('.gh-day-cell:not(.gh-day-filler)').forEach(bindCellHover);
  if (scrollContainer) {
    scrollContainer.scrollLeft = scrollContainer.scrollWidth;
  }

  // 2. Fetch live updates in the background and update badges
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const res = await fetch('https://github-contributions-api.jogruber.de/v4/KevinNaserwan?y=all', {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.total) {
        Object.keys(GH_YEAR_TOTALS).forEach(yr => {
          if (typeof data.total[yr] === 'number') {
            GH_YEAR_TOTALS[yr] = data.total[yr];
            const badge = document.getElementById(`badge-${yr}`);
            if (badge) badge.textContent = data.total[yr];
          }
        });
      }
      if (data && Array.isArray(data.contributions)) {
        data.contributions.forEach(c => {
          if (c.count > 0 && c.date) {
            GH_ACTIVE_DAYS[c.date] = [c.count, c.level || 1];
          }
        });
      }
    }
  } catch (err) {
    // Graceful fallback to verified built-in data
  }
}

// Initialize Language, Live Exchange Rates, and Realtime GitHub Telemetry
fetchLiveExchangeRates();
detectDefaultLanguage();
fetchGitHubRealtimeStats();
fetchGitHubCommitHeatmap();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    fetchLiveExchangeRates();
    detectDefaultLanguage();
    fetchGitHubRealtimeStats();
    fetchGitHubCommitHeatmap();
  });
}




