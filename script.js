const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-reveal for elements marked .reveal
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}

// Real public repo count from the GitHub API — no fabricated stats.
// Fails silently (leaves the line blank) if the API is unreachable or rate-limited.
fetch('https://api.github.com/users/shayan429')
  .then((res) => (res.ok ? res.json() : null))
  .then((data) => {
    if (!data) return;
    const stat = document.getElementById('githubStat');
    if (stat && typeof data.public_repos === 'number') {
      stat.textContent = `${data.public_repos} public repositories on GitHub`;
    }
  })
  .catch(() => {
    /* offline or rate-limited — no stat shown, nothing fabricated */
  });
