/**
 * RADITYA BAGUS HARDANA - PORTFOLIO INTERACTIVITY
 * Clean, Modular, Performant JavaScript (ESM)
 */

// --- Project Data ---
const projectsData = [
  {
    id: "pesona-toba",
    category: "landing",
    title: "Pesona Toba - Tourism Destination Platform",
    tag: "Tourism & Culture",
    shortDesc: "Landing page imersif dan responsif untuk mempromosikan pariwisata Danau Toba dengan tipografi elegan, galeri panorama, dan paket wisata terkurasi.",
    fullDesc: `Pesona Toba adalah platform landing page modern yang dirancang khusus untuk mempromosikan keindahan alam vulkanik dan warisan budaya Danau Toba sebagai destinasi wisata kelas dunia.
    
    Fitur Utama:
    • Hero visual interaktif dengan scenic dark overlay untuk keterbacaan teks maksimal.
    • Navigasi terstruktur: Paket Wisata, Budaya & Heritage, Peta Interaktif, dan Journal.
    • Kartu destinasi responsif dengan micro-interaction hover.
    • Optimalisasi SEO semantik dan kecepatan muat gambar dengan format WebP.`,
    tech: ["HTML5", "Modern CSS", "JavaScript ES6+", "Responsive Design"],
    image: "/assets/images/project-tourism.jpg",
    liveUrl: "https://danau-toba.vercel.app",
    repoUrl: "https://github.com/AFDAlKURNIAWAN/Danau-toba"
  },
  {
    id: "aurora-store",
    category: "ecommerce",
    title: "Aurora - Minimalist Modern E-Commerce Store",
    tag: "E-Commerce App",
    shortDesc: "Aplikasi toko online modern dengan katalog produk minimalis, filter harga interaktif, sistem keranjang belanja (cart drawer), dan checkout responsif.",
    fullDesc: `Aurora Tech & Lifestyle adalah platform web e-commerce berorientasi performa tinggi untuk produk gadget dan apparel modern.
    
    Fitur Utama:
    • Instant Cart Drawer dengan perhitungan subtotal otomatis tanpa reload.
    • Filter kategori dan slider rentang harga interaktif.
    • Desain kartu produk grid gapless dengan indikator stok dan badge varian.
    • Arsitektur state management ringan dan animasi transisi halus.`,
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "REST API"],
    image: "/assets/images/project-ecommerce.jpg",
    liveUrl: "https://ecommerce-self-kappa.vercel.app/",
    repoUrl: "https://github.com/AFDAlKURNIAWAN/Ecommerce"
  },
  {
    id: "raditya-devstudio",
    category: "agency",
    title: "Raditya DevStudio - Digital Services Agency",
    tag: "Agency & Services",
    shortDesc: "Landing page agensi layanan pembuatan website profesional, cepat, dan berkonversi tinggi untuk personal branding, UMKM, dan startup digital.",
    fullDesc: `Raditya DevStudio adalah platform representasi layanan pengembangan web modern dan digital branding freelance.
    
    Fitur Utama:
    • Hero section dinamis dengan visual bento card representatif.
    • Katalog paket layanan website terstruktur (Landing Page, Company Profile, Web App).
    • Kalkulator perkiraan biaya website transparan untuk calon klien.
    • Integrasi form konsultasi cepat terhubung langsung ke WhatsApp & Email.`,
    tech: ["HTML5", "Vanilla CSS", "JavaScript", "SEO Optimization", "Web3Forms"],
    image: "/assets/images/project-agency.svg",
    liveUrl: "#",
    repoUrl: "https://github.com/AFDAlKURNIAWAN"
  }
];

// --- Certificate Data ---
const certsData = [
  {
    id: "lks-2024",
    title: "Peserta Lomba Kompetensi Siswa (LKS) SMK 2024 - Web Technology",
    issuer: "Dinas Pendidikan Provinsi Sumatera Utara",
    year: "2024",
    desc: "Sertifikat resmi kompetisi bidang Web Technology tingkat provinsi. Berhasil merancang solusi website toko online responsif lengkap dengan katalog dan manajemen stok terstruktur.",
    image: "/assets/images/cert-lks.svg",
    badge: "Tingkat Provinsi"
  },
  {
    id: "aws-cloud-ai",
    title: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia × AWS",
    year: "2024",
    desc: "Sertifikasi resmi penyelesaian kurikulum fundamental infrastruktur Cloud AWS dan implementasi Generative AI modern untuk solusi berbasis data.",
    image: "/assets/images/cert-aws.svg",
    badge: "Cloud & Gen AI"
  },
  {
    id: "dicoding-ai",
    title: "Belajar Dasar Artificial Intelligence (AI)",
    issuer: "Dicoding Indonesia",
    year: "2024",
    desc: "Sertifikasi kelulusan kurikulum dasar kecerdasan buatan, Machine Learning concepts, data preprocessing, dan pemanfaatan model AI pada aplikasi web modern.",
    image: "/assets/images/cert-ai.svg",
    badge: "AI Fundamentals"
  }
];

// --- DOM Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavbar();
  initMarquee();
  initShowcaseTabs();
  initModals();
  initLiveClock();
  initContactForm();
  initBackToTop();
});

// --- 1. Theme Switcher (Dark/Light) ---
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  // Default: Light Mode First!
  const savedTheme = localStorage.getItem('raditya_theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('raditya_theme', nextTheme);
      showToast(`Mode tema diubah ke ${nextTheme === 'light' ? 'Terang' : 'Gelap'}`);
    });
  }
}

// --- 2. Dynamic Typewriter Effect ---
function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const phrases = [
    "Frontend Developer 🚀",
    "UI/UX Craftsman 💻",
    "Modern Web Architect ⚡",
    "Clean Code Advocate 🎯"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseTime = 1800;

  function tick() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      charIdx--;
      target.textContent = currentPhrase.substring(0, charIdx);
    } else {
      charIdx++;
      target.textContent = currentPhrase.substring(0, charIdx);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// --- 3. Navbar & Scroll Active Highlight ---
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Highlight
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Mobile Drawer Toggle
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    });
  }
}

// --- 4. Infinite Tech Marquee Duplication ---
function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  // Clone children to ensure seamless continuous scroll
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
}

// --- 5. Showcase Tabs (Projects vs Certificates) ---
function initShowcaseTabs() {
  const tabProjects = document.getElementById('tabProjectsBtn');
  const tabCerts = document.getElementById('tabCertsBtn');
  const paneProjects = document.getElementById('paneProjects');
  const paneCerts = document.getElementById('paneCerts');

  if (tabProjects && tabCerts) {
    tabProjects.addEventListener('click', () => {
      tabProjects.classList.add('active');
      tabCerts.classList.remove('active');
      paneProjects?.classList.add('active');
      paneCerts?.classList.remove('active');
    });

    tabCerts.addEventListener('click', () => {
      tabCerts.classList.add('active');
      tabProjects.classList.remove('active');
      paneCerts?.classList.add('active');
      paneProjects?.classList.remove('active');
    });
  }
}

// --- 6. Modals (Project Detail & Certificate Preview) ---
function initModals() {
  const modalOverlay = document.getElementById('globalModalOverlay');
  const modalContainer = document.getElementById('modalDynamicContent');
  const closeBtn = document.getElementById('modalCloseBtn');

  function openModal(htmlContent) {
    if (!modalOverlay || !modalContainer) return;
    modalContainer.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach Project Detail Triggers
  document.querySelectorAll('[data-project-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projId);
      if (!project) return;

      const techBadges = project.tech.map(t => `<span class="tech-tag-chip">${t}</span>`).join('');
      const modalHtml = `
        <div class="project-modal-view">
          <div style="position:relative; border-radius:12px; overflow:hidden; margin-bottom:20px; aspect-ratio:16/9; background:var(--bg-secondary); border:1px solid var(--border-subtle);">
            <img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">
            <span class="project-badge-tag" style="top:16px; left:16px;">${project.tag}</span>
          </div>
          <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-main); margin-bottom:8px;">${project.title}</h2>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px;">
            ${techBadges}
          </div>
          <div style="color:var(--text-secondary); font-size:0.95rem; line-height:1.7; white-space:pre-line; margin-bottom:24px;">
            ${project.fullDesc}
          </div>
          <div style="display:flex; gap:12px; flex-wrap:wrap; padding-top:16px; border-top:1px solid var(--border-subtle);">
            ${project.liveUrl !== '#' ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-primary" style="flex:initial; padding:10px 24px;">
                🚀 Buka Website Live
              </a>
            ` : ''}
            <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-card-outline" style="flex:initial; padding:10px 24px;">
              📂 Source Code (GitHub)
            </a>
          </div>
        </div>
      `;
      openModal(modalHtml);
    });
  });

  // Attach Certificate Triggers
  document.querySelectorAll('[data-cert-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = btn.getAttribute('data-cert-id');
      const cert = certsData.find(c => c.id === certId);
      if (!cert) return;

      const modalHtml = `
        <div class="cert-modal-view" style="text-align:center;">
          <div style="border-radius:12px; overflow:hidden; margin-bottom:20px; border:1px solid var(--border-subtle); background:var(--bg-secondary);">
            <img src="${cert.image}" alt="${cert.title}" style="width:100%; height:auto; display:block;">
          </div>
          <h2 style="font-size:1.4rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">${cert.title}</h2>
          <p style="font-size:0.85rem; font-family:var(--font-mono); color:var(--accent-cyan); margin-bottom:14px;">Penerbit: ${cert.issuer} • ${cert.year}</p>
          <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6; max-width:580px; margin:0 auto 20px auto;">${cert.desc}</p>
        </div>
      `;
      openModal(modalHtml);
    });
  });
}

// --- 7. Isolated Live Clock Widget (Jakarta / WIB) ---
function initLiveClock() {
  const clockEl = document.getElementById('liveClockTime');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Use Indonesian locale
    const timeStr = now.toLocaleTimeString('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    clockEl.textContent = `${timeStr} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// --- 8. Contact Form & Email Copy ---
function initContactForm() {
  const form = document.getElementById('contactForm');
  const copyBtn = document.getElementById('copyEmailBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = "raditya.hardana@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("✓ Email berhasil disalin ke clipboard!");
      }).catch(() => {
        showToast("Email: " + email);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const name = form.elements['name']?.value.trim();
      const email = form.elements['email']?.value.trim();
      const message = form.elements['message']?.value.trim();

      if (!name || !email || !message) {
        showToast("⚠️ Mohon lengkapi semua kolom formulir.");
        return;
      }

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Mengirim pesan...</span>`;

      // Simulate clean asynchronous submission with friendly modal feedback
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();

        const successHtml = `
          <div style="text-align:center; padding:20px 10px;">
            <div style="width:64px; height:64px; border-radius:50%; background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald); display:inline-flex; align-items:center; justify-content:center; font-size:2rem; margin-bottom:16px;">
              ✓
            </div>
            <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-main); margin-bottom:8px;">Pesan Berhasil Terkirim!</h2>
            <p style="color:var(--text-secondary); font-size:1rem; line-height:1.6; margin-bottom:20px;">
              Terima kasih, <strong>${name}</strong>! Pesan Anda telah saya terima. Saya akan segera menghubungi Anda melalui email <em>${email}</em>.
            </p>
          </div>
        `;
        
        const modalOverlay = document.getElementById('globalModalOverlay');
        const modalContainer = document.getElementById('modalDynamicContent');
        if (modalOverlay && modalContainer) {
          modalContainer.innerHTML = successHtml;
          modalOverlay.classList.add('active');
        }
      }, 700);
    });
  }
}

// --- 9. Floating Back To Top Button ---
function initBackToTop() {
  const bttBtn = document.getElementById('backToTopBtn');
  if (!bttBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Global Toast Notification Helper ---
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
