// ═══════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
document.addEventListener('mousemove', e => {
  dot.style.left  = ring.style.left  = e.clientX + 'px';
  dot.style.top   = ring.style.top   = e.clientY + 'px';
});

// ═══════════════════════════════════════════════
// NAVBAR SCROLL
// ═══════════════════════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ═══════════════════════════════════════════════
// HAMBURGER / MOBILE MENU
// ═══════════════════════════════════════════════
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ═══════════════════════════════════════════════
// FADE-IN ON SCROLL
// ═══════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════════
// GALLERY SLIDER
// ═══════════════════════════════════════════════
function slideGallery(btn, dir) {
  const slider = btn.closest('.gallery-wrapper').querySelector('.gallery-slider');
  slider.scrollBy({ left: dir * 220, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════
// PROJECT DATA
// ═══════════════════════════════════════════════
const projectData = {
  simonev: {
    client: 'Client: TK Almuhajirin Dotamana',
    name: 'SIMONEV',
    role: 'Fullstack Developer · 2-person team',
    desc: 'Developed a web-based system for monitoring and evaluating early childhood development. The platform enables teachers to efficiently record, manage, and assess children developmental progress through a centralized digital dashboard. It also provides parents with access to periodic development reports, improving transparency and communication between schools and families. The system streamlines data management, automates report generation, and supports data-driven decision-making for educational institutions. ',
    techs: ['Next.js', 'Laravel', 'MySQL', 'REST API', 'TypeScript'],
    screenshots: [
      'assets/images/simonev-ss1.png',
      'assets/images/simonev-ss2.png',
      'assets/images/simonev-ss3.png',
      'assets/images/simonev-ss4.png',
      'assets/images/simonev-ss5.png',
      'assets/images/simonev-ss6.png',
    ]
  },
  simkarin: {
    client: 'Client: PT Lancang Kuning Sukses',
    name: 'SIMKARIN',
    role: 'Fullstack Developer · 4-person team',
    desc: 'Developed a web-based employee management system for PT Lancang Kuning Sukses with role-based access control. HR users can manage employee records, organizational data, and documents, while Management & IT users have view-only access for monitoring and reporting. Built frontend and backend functionalities, including authentication, employee management, document handling, and dashboard features.',
    techs: ['Next.js', 'React', 'Node.js', 'Express.js', 'Tailwind CSS', 'MySQL', 'REST API'],
    screenshots: [
      'assets/images/simkarin-ss1.png',
      'assets/images/simkarin-ss2.png',
      'assets/images/simkarin-ss3.png',
      'assets/images/simkarin-ss4.png',
      'assets/images/simkarin-ss6.png',
      'assets/images/simkarin-ss7.png',
    ]
  },
  purebeauty: {
    client: 'Academic Project · Semester 1',
    name: 'PureBeauty',
    role: 'Fullstack Developer · Solo project',
    desc: 'A web-based skincare e-commerce platform with product catalog, shopping cart, user authentication, and order management. Built as a first-semester academic project to explore full web development workflow from frontend to backend.',
    techs: ['Laravel', 'MySQL', 'PHP', 'Bootstrap'],
    screenshots: [
      'assets/images/purebeauty-ss1.png',
      'assets/images/purebeauty-ss2.png',
      'assets/images/purebeauty-ss3.png',
      'assets/images/purebeauty-ss4.png',
      'assets/images/purebeauty-ss5.png',
      'assets/images/purebeauty-ss6.png',
    ]
  },
  leportrait: {
    client: 'Academic Project',
    name: 'Le-Portrait',
    role: 'Fullstack Developer · 4-person team',
    desc: 'Developed a web-based e-commerce platform for camera products and accessories. Implemented product catalog management, shopping cart functionality, order processing, payment handling, and an administrative dashboard for managing products, customers, and transactions.',
    techs: ['Laravel', 'MySQL', 'PHP'],
    screenshots: [
      'assets/images/leportrait-ss1.png',
      'assets/images/leportrait-ss2.png',
      'assets/images/leportrait-ss3.png',
      'assets/images/leportrait-ss4.png',
      'assets/images/leportrait-ss5.png',
      'assets/images/leportrait-ss6.png',
    ]
  }
};

// ═══════════════════════════════════════════════
// PROJECT MODAL
// ═══════════════════════════════════════════════
let currentProjectKey = null;

function openProjectModal(key) {
  const data = projectData[key];
  if (!data) return;
  currentProjectKey = key;

  document.getElementById('modal-client').textContent = data.client;
  document.getElementById('modal-name').textContent   = data.name;
  document.getElementById('modal-role').textContent   = data.role;
  document.getElementById('modal-desc').textContent   = data.desc;

  const techsEl = document.getElementById('modal-techs');
  techsEl.innerHTML = data.techs.map(t => `<span class="tech-badge">${t}</span>`).join('');

  const grid = document.getElementById('modal-ss-grid');
  grid.innerHTML = data.screenshots.map((src, i) => `
    <div class="ss-slot">
      <img
        src="${src}"
        alt="Screenshot ${i + 1}"
        onclick="openLightboxProject('${key}', ${i})"
        onerror="this.parentElement.innerHTML='<div class=ss-placeholder><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><path d=\\'M21 15l-5-5L5 21\\'/></svg><span>Screenshot ${i + 1}</span></div>'"
      />
    </div>
  `).join('');

  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeLightbox();
  }
});

// ═══════════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════════
let lightboxImages = [];
let lightboxIndex  = 0;

function openLightboxProject(projectKey, index) {
  const data = projectData[projectKey];
  if (!data) return;
  lightboxImages = data.screenshots;
  lightboxIndex  = index;
  _showLightbox();
}

function openLightboxSimple(src) {
  lightboxImages = [src];
  lightboxIndex  = 0;
  _showLightbox();
}

function _showLightbox() {
  const lb      = document.getElementById('lightbox');
  const img     = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  img.src = lightboxImages[lightboxIndex];

  const multiple = lightboxImages.length > 1;
  counter.style.display = multiple ? 'block' : 'none';
  prevBtn.style.display  = multiple ? 'flex'  : 'none';
  nextBtn.style.display  = multiple ? 'flex'  : 'none';

  if (multiple) {
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  _showLightbox();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  if (!document.getElementById('projectModal').classList.contains('active')) {
    document.body.style.overflow = '';
  }
}