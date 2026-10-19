// 다크모드 토글
const root = document.documentElement;
function toggleTheme() {
  const dark = root.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
}
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-m').addEventListener('click', toggleTheme);

// 모바일 메뉴
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// 스크롤 등장 애니메이션
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 섹션 네비 강조
const links = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  }),
  { rootMargin: '-40% 0px -55% 0px' }
);
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// 이메일 복사
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', async () => {
  const original = copyBtn.textContent;
  try {
    await navigator.clipboard.writeText('kdy953@gmail.com');
    copyBtn.textContent = '복사됨 ✓';
  } catch (e) {
    copyBtn.textContent = '복사 실패';
  }
  setTimeout(() => (copyBtn.textContent = original), 1800);
});
