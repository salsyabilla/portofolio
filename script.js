/* =============================================
   SABRINA ROSA SALSYABILLA — PORTFOLIO JS
   ============================================= */

/* ─── CUSTOM CURSOR ─── */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── ACTIVE NAV LINK ─── */
window.addEventListener('scroll', () => {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ─── MOBILE MENU ─── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── SCROLL FADE-IN ─── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // stagger children
      e.target.querySelectorAll('.skill-group, .project-card, .org-card, .volunteer-card, .cert-card').forEach((child, i) => {
        child.style.transitionDelay = (i * 0.08) + 's';
        child.classList.add('visible');
      });
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ─── GALLERY SLIDER ─── */
document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
  const slider = wrapper.querySelector('.gallery-slider');
  const next   = wrapper.querySelector('.gallery-btn.next');
  const prev   = wrapper.querySelector('.gallery-btn.prev');

  if (next) next.addEventListener('click', () => slider.scrollBy({ left: 220, behavior: 'smooth' }));
  if (prev) prev.addEventListener('click', () => slider.scrollBy({ left: -220, behavior: 'smooth' }));
});

/* ─── LIGHTBOX ─── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeProjectModal();
  }
});

/* ─── PROJECT MODAL DATA ─── */
const projectData = {
  simonev: {
    client: 'Client: TK Almuhajirin Dotamana',
    name:   'SIMONEV',
    role:   'Fullstack Developer · 2-person team',
    desc:   'An early childhood development monitoring and evaluation system built for a kindergarten. The platform enables teachers to record and track child development across multiple developmental aspects, while parents can monitor their child\'s progress in real time. Admins manage all data, users, and reports from a centralized dashboard.',
    techs:  ['Next.js', 'Laravel', 'MySQL', 'REST API', 'TypeScript'],
    // ← Add your actual screenshot paths here:
    screenshots: [
      // 'assets/images/simonev-1.png',
      // 'assets/images/simonev-2.png',
      // 'assets/images/simonev-3.png',
    ]
  },
  simkarin: {
    client: 'Client: PT Lancang Kuning Sukses',
    name:   'SIMKARIN',
    role:   'Fullstack Developer · 4-person team',
    desc:   'A web-based employee database management system developed for a corporate client. The system streamlines employee data management, organizational structures, and document workflows. Responsible for frontend development, backend API integration, and database architecture.',
    techs:  ['Next.js', 'Laravel', 'MySQL', 'REST API'],
    screenshots: [
      // 'assets/images/simkarin-1.png',
      // 'assets/images/simkarin-2.png',
      // 'assets/images/simkarin-3.png',
    ]
  },
  leportrait: {
    client: 'Academic Project',
    name:   'Le-Portrait',
    role:   'Fullstack Developer · 4-person team',
    desc:   'A camera and accessories e-commerce application with complete transaction management capabilities. Features include product catalog, shopping cart, order processing, payment integration, and an admin panel for order management and export. Built collaboratively with a focus on clean UX and reliable backend logic.',
    techs:  ['Laravel', 'MySQL', 'PHP'],
    screenshots: [
      // 'assets/images/leportrait-1.png',
      // 'assets/images/leportrait-2.png',
      // 'assets/images/leportrait-3.png',
    ]
  }
};

/* ─── PROJECT MODAL OPEN / CLOSE ─── */
const projectModal = document.getElementById('projectModal');

function openProjectModal(key) {
  const data = projectData[key];
  if (!data) return;

  document.getElementById('modal-client').textContent = data.client;
  document.getElementById('modal-name').textContent   = data.name;
  document.getElementById('modal-role').textContent   = data.role;
  document.getElementById('modal-desc').textContent   = data.desc;

  // Tech badges
  const techsEl = document.getElementById('modal-techs');
  techsEl.innerHTML = data.techs.map(t => `<span class="tech-badge">${t}</span>`).join('');

  // Screenshots — fill slots or show placeholder
  const slots = ['modal-ss-1', 'modal-ss-2', 'modal-ss-3'];
  slots.forEach((id, i) => {
    const slot = document.getElementById(id);
    const src  = data.screenshots[i];
    if (src) {
      slot.innerHTML = `<img src="${src}" alt="Screenshot ${i+1}" onclick="openLightbox('${src}')"/>`;
    } else {
      slot.innerHTML = `
        <div class="ss-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span>Screenshot coming soon</span>
        </div>`;
    }
  });

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── SKILL TAG RIPPLE ─── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.4);
      transform:scale(0); animation:ripple 0.5s linear;
      pointer-events:none; width:60px; height:60px;
      top:${e.offsetY-30}px; left:${e.offsetX-30}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform:scale(2.5); opacity:0; } }`;
document.head.appendChild(style);