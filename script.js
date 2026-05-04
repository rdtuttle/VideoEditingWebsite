const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  const revealTargets = document.querySelectorAll(
    ".hero-shell, .section, .page-hero, .feature-card, .contact-card, .story-card, .profile-frame, .final-cta, .compact-proof"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

const panels = document.querySelectorAll("[data-panel]");
const visuals = document.querySelectorAll("[data-visual]");

if (panels.length && visuals.length) {
  const activateVisual = (index) => {
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === index);
    });

    visuals.forEach((visual) => {
      visual.classList.toggle("active", visual.dataset.visual === index);
    });
  };

  const panelObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (activeEntry) {
        activateVisual(activeEntry.target.dataset.panel);
      }
    },
    {
      rootMargin: "-35% 0px -35% 0px",
      threshold: [0.18, 0.35, 0.6],
    }
  );

  panels.forEach((panel) => panelObserver.observe(panel));
}
