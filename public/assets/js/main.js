document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing effect for Hero subtitle
  const roles = [
    "Application Developer @ PT Bukit Asam Tbk",
    "Enterprise Microservices Engineer",
    "Sports Analytics Researcher (Barça 2027)",
    "Applied Geospatial AI Researcher"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTarget = document.getElementById('typed-text');

  function typeEffect() {
    if (!typedTarget) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at complete word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 2. Scroll Reveal Intersection Observer
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // 3. Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Contact Form Handling (mailto action)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      const mailtoLink = `mailto:kevinnaserwan@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent("Sender Email: " + email + "\n\n" + message)}`;
      window.location.href = mailtoLink;
    });
  }
});
