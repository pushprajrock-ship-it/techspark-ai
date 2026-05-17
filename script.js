// ====== NEURAL NETWORK BACKGROUND ======
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const numParticles = Math.min(100, window.innerWidth / 15); // responsive amount

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      // mix of gold and soft blue
      color: Math.random() > 0.5 ? 'rgba(244, 224, 115, ' : 'rgba(79, 142, 247, ',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // update positions
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      
      // draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 15;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    });

    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = 1 - (dist / 150);
          // line color matching the gold theme
          ctx.strokeStyle = `rgba(244, 224, 115, ${opacity * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(244, 224, 115, 0.6)`;
          ctx.stroke();
        }
      }
    }
    ctx.shadowBlur = 0; // reset
    requestAnimationFrame(draw);
  }
  draw();
}

// ====== NAVBAR SCROLL EFFECT ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.add('active');
    }
  });
  // Back to top
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ====== BACK TO TOP ======
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ====== INTERSECTION OBSERVER (scroll reveal) ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-fade-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});

// Add staggered delays for grid items
document.querySelectorAll('.about-cards .about-card').forEach((el, i) => el.style.transitionDelay = `${i * 0.1}s`);
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => el.style.transitionDelay = `${i * 0.12}s`);
document.querySelectorAll('.pricing-grid .pricing-card').forEach((el, i) => el.style.transitionDelay = `${i * 0.1}s`);

// ====== CONTACT FORM ======
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  btn.disabled = true;
  setTimeout(() => {
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    btn.disabled = false;
    document.getElementById('form-success').style.display = 'block';
    this.reset();
    setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
  }, 1800);
});

// ====== SMOOTH HOVER GLOW ON SERVICE CARDS ======
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.service-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(79,142,247,0.12) 0%, transparent 60%)`;
    }
  });
});
