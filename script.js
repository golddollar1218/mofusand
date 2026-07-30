(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  menuToggle?.addEventListener("click", () => {
    const open = mobileNav.hasAttribute("hidden");
    if (open) {
      mobileNav.removeAttribute("hidden");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close menu");
    } else {
      mobileNav.setAttribute("hidden", "");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open menu");
    });
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.dataset.src;
      const alt = item.dataset.alt || "";
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightbox.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.setAttribute("hidden", "");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hasAttribute("hidden")) {
      closeLightbox();
    }
  });

  const revealTargets = document.querySelectorAll(
    ".about .section-inner, .howtobuy .section-inner, .tokenomics .section-inner, .gallery .section-inner, .join-panel, .traits li, .buy-card, .token-card, .gallery-item"
  );

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));

  const copyBtn = document.getElementById("copy-ca");
  const caAddress = document.getElementById("ca-address");

  copyBtn?.addEventListener("click", async () => {
    const value =
      copyBtn.dataset.ca ||
      caAddress?.textContent?.trim() ||
      "";
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(caAddress);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

    const prev = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("is-copied");
    setTimeout(() => {
      copyBtn.textContent = prev;
      copyBtn.classList.remove("is-copied");
    }, 1600);
  });
})();
