// Ticker content generation
const tickerItems = [
  'CRUDE RESERVES — SECURED','CRUDE PIPELINE — OPERATIONAL','BARREL PRICE — VOLATILE',
  'COMMUNITY — EXPANDING','$CORA PROTOCOL — ACTIVE','OIL DEMAND — ALL TIME HIGH','GLOBAL CRUDE — CONSTRAINED'
];
const tickerEl = document.getElementById('tickerContent');
if (tickerEl) {
  let html = '';
  for (let i = 0; i < 3; i++) {
    tickerItems.forEach(item => {
      html += `<span>${item}</span><span class="dot"></span>`;
    });
  }
  tickerEl.innerHTML = html;
}

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll reveal
const animEls = document.querySelectorAll('.anim');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
animEls.forEach(el => observer.observe(el));

// Hero entrance animation
setTimeout(() => {
  document.querySelectorAll('.hero-inner .anim').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 200);
  });
}, 300);

// Copy contract
const CA = 'CoARSp4P9Yr7MEnKMZE7chyAkK3mNbPFyArdQeMm9a1G';
function handleCopy(btn) {
  navigator.clipboard.writeText(CA).then(() => {
    const orig = btn.innerHTML;
    const span = document.createElement('span');
    span.textContent = 'Copied!';
    span.style.cssText = 'color:var(--accent);font-size:10px;letter-spacing:0.1em;';
    btn.innerHTML = '';
    btn.appendChild(span);
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}
document.getElementById('copyBtn')?.addEventListener('click', function() { handleCopy(this); });
document.getElementById('copyBtn2')?.addEventListener('click', function() { handleCopy(this); });

// Distribution bar animation
const distObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.dist-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      distObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.dist-bars').forEach(el => distObserver.observe(el));

// Mobile menu
const mobBtn = document.getElementById('mobBtn');
let mobileOpen = false;
mobBtn?.addEventListener('click', () => {
  mobileOpen = !mobileOpen;
  // Simple toggle - could add mobile menu panel
  const links = document.querySelector('.nav-links');
  const right = document.querySelector('.nav-right');
  if (mobileOpen) {
    links.style.cssText = 'display:flex;position:fixed;top:84px;left:0;right:0;flex-direction:column;background:rgba(4,4,8,0.98);padding:32px;gap:24px;z-index:89;backdrop-filter:blur(20px);border-bottom:1px solid var(--border-subtle);';
    right.style.cssText = 'display:flex;position:fixed;top:calc(84px + 200px);left:0;right:0;justify-content:center;background:rgba(4,4,8,0.98);padding:16px 32px;z-index:89;backdrop-filter:blur(20px);border-bottom:1px solid var(--border-subtle);';
  } else {
    links.style.cssText = '';
    right.style.cssText = '';
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      if (mobileOpen) mobBtn.click();
    }
  });
});
