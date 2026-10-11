// Ambient 3D Particle/Mesh Canvas (Ultra-clean, zero AI-slop, subtle interactive movement)
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
  const count = Math.floor((width * height) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.25 + 0.1
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
  const lineColor = isLight ? 'rgba(0, 0, 0, 0.035)' : 'rgba(255, 255, 255, 0.035)';

  // Draw subtle connection lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.7;
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
    if (mdist < 140) {
      const force = (140 - mdist) / 140;
      p.x += (mdx / mdist) * force * 1.5;
      p.y += (mdy / mdist) * force * 1.5;
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

// Interactive 3D Card Tilt for Portrait
const portraitCard = document.querySelector('.portrait-card');
if (portraitCard) {
  portraitCard.addEventListener('mousemove', (e) => {
    const rect = portraitCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    
    portraitCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  portraitCard.addEventListener('mouseleave', () => {
    portraitCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// Modal zoom for portfolio projects
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
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
