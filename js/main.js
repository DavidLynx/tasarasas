document.addEventListener("DOMContentLoaded", () => {
  const hasGSAP = typeof gsap !== "undefined";
  const hasScrollTrigger = typeof ScrollTrigger !== "undefined";
  const root = document.documentElement;
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMobile = document.getElementById("navMobile");
  const lotes = document.querySelectorAll("[data-lote]");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const pillCards = document.querySelectorAll("[data-pilar]");
  const productCards = document.querySelectorAll("[data-product]");
  const leonorRevealBlocks = document.querySelectorAll("[data-leonor-reveal]");
  const leonorShowcaseCards = document.querySelectorAll("[data-leonor-showcase-card]");
  const leonorMomentCards = document.querySelectorAll("[data-leonor-moment]");
  const leonorFrames = document.querySelectorAll("[data-leonor-frame]");
  const leonorStacks = document.querySelectorAll("[data-leonor-stack]");
  const originEntries = document.querySelectorAll("[data-origin-entry]");
  const originHeroCards = document.querySelectorAll("[data-origin-hero-card]");
  const originBands = document.querySelectorAll("[data-origin-band]");
  const originShots = document.querySelectorAll("[data-origin-shot]");
  const originLineProgress = document.getElementById("originLineProgress");

  const closeMobileNav = () => {
    if (navMobile && navMobile.classList.contains("open")) {
      navMobile.classList.remove("open");
      if (hamburger) hamburger.setAttribute("aria-expanded", "false");
    }
  };

  const handleAnchorNavigation = (event, link) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const navHeightVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-h")
      .trim();

    const navHeight = Number.parseInt(navHeightVar || "76", 10) || 76;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    closeMobileNav();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => handleAnchorNavigation(event, link));
  });

  const setNavbarScrollState = () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  };

  window.addEventListener("scroll", setNavbarScrollState, { passive: true });
  setNavbarScrollState();

  const activateTimelineItem = (item) => {
    lotes.forEach((entry) => entry.classList.remove("active"));
    item.classList.add("active");

    if (hasGSAP) {
      const card = item.querySelector(".tl-card");
      if (card) {
        gsap.fromTo(
          card,
          { y: 8, scale: 0.985 },
          { y: 0, scale: 1, duration: 0.32, ease: "back.out(1.6)" }
        );
      }
    }
  };

  lotes.forEach((lote) => {
    lote.addEventListener("click", () => activateTimelineItem(lote));
  });

  const setPillStateStatic = (activeCard) => {
    pillCards.forEach((card) => {
      const trigger = card.querySelector("[data-pill-trigger]");
      const isActive = card === activeCard;
      card.classList.toggle("is-active", isActive);
      if (trigger) trigger.setAttribute("aria-expanded", String(isActive));
    });
  };

  const setPillStateAnimated = (activeCard) => {
    pillCards.forEach((card) => {
      const trigger = card.querySelector("[data-pill-trigger]");
      const copy = card.querySelector(".pilar-trigger-copy");
      const iconWrap = card.querySelector(".pilar-icon-wrap");
      const isActive = card === activeCard;

      card.classList.toggle("is-active", isActive);
      if (trigger) trigger.setAttribute("aria-expanded", String(isActive));

      if (!trigger || !copy || !iconWrap) return;

      gsap.killTweensOf([trigger, copy, iconWrap]);

      gsap.to(trigger, {
        paddingRight: isActive ? 18 : 6,
        backgroundColor: isActive ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0)",
        duration: 0.34,
        ease: "power2.out"
      });

      gsap.to(copy, {
        maxWidth: isActive ? 320 : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.34,
        ease: "power2.out"
      });

      gsap.to(iconWrap, {
        scale: isActive ? 1.04 : 1,
        duration: 0.34,
        ease: "power2.out"
      });
    });
  };

  if (!hasGSAP) {
    root.classList.remove("gsap-ready");
    setPillStateStatic(pillCards[0] || null);
    console.warn("GSAP no cargó. La página funcionará sin animaciones.");
    return;
  }

  root.classList.add("gsap-ready");

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.defaults({
    duration: 0.7,
    ease: "power2.out"
  });

  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: "(min-width: 981px)",
      mobile: "(max-width: 980px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { desktop, reduceMotion } = context.conditions;

      if (reduceMotion) {
        setPillStateStatic(pillCards[0] || null);
        gsap.set(
          [
            "[data-pilar]",
            "[data-reveal]",
            "[data-reveal-right]",
            "[data-product]",
            "[data-leonor-reveal]",
            "[data-leonor-showcase-card]",
            "[data-leonor-moment]",
            "[data-leonor-frame]",
            "[data-origin-entry]",
            "[data-origin-hero-card]",
            "[data-origin-band]",
            ".contacto-card",
            "#heroBadge",
            "#heroTitle",
            "#heroSubtitle",
            "#heroCtas",
            "#heroStats",
            "#heroLogo",
            "#heroScroll"
          ],
          { clearProps: "all", opacity: 1 }
        );
        return;
      }

      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      gsap.set(
        ["#heroBadge", "#heroTitle", "#heroSubtitle", "#heroCtas", "#heroStats", "#heroLogo", "#heroScroll"],
        { autoAlpha: 1 }
      );

      heroTimeline
        .from("#heroBadge", { y: -18, autoAlpha: 0, duration: 0.5 }, 0.05)
        .from("#heroTitle", { y: 40, autoAlpha: 0, duration: 0.9 }, 0.15)
        .from("#heroSubtitle", { y: 24, autoAlpha: 0, duration: 0.7 }, 0.32)
        .from("#heroCtas", { y: 18, autoAlpha: 0, duration: 0.55 }, 0.48)
        .from("#heroStats", { y: 14, autoAlpha: 0, duration: 0.55 }, 0.58)
        .from("#heroLogo", { x: 36, autoAlpha: 0, scale: 0.96, duration: 0.95 }, 0.2)
        .from("#heroScroll", { y: 10, autoAlpha: 0, duration: 0.4 }, 0.95);

      gsap.to("#heroLogo", {
        y: -10,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      if (hasScrollTrigger) {
        const revealUp = document.querySelectorAll("[data-pilar], [data-product], .contacto-card");
        const revealLeft = document.querySelectorAll("[data-reveal]");
        const revealRight = document.querySelectorAll("[data-reveal-right]");

        if (revealUp.length) {
          gsap.to(revealUp, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.14,
            scrollTrigger: {
              trigger: revealUp[0].closest("section"),
              start: "top 80%",
              once: true
            }
          });
        }

        revealLeft.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, x: -36 },
            {
              autoAlpha: 1,
              x: 0,
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                once: true
              }
            }
          );
        });

        revealRight.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, x: 36 },
            {
              autoAlpha: 1,
              x: 0,
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                once: true
              }
            }
          );
        });
      } else {
        gsap.set("[data-pilar], [data-reveal], [data-reveal-right], [data-product], .contacto-card", {
          autoAlpha: 1,
          clearProps: "transform"
        });
      }

      setPillStateAnimated(pillCards[0] || null);

      pillCards.forEach((card) => {
        const trigger = card.querySelector("[data-pill-trigger]");
        if (!trigger) return;

        trigger.addEventListener("click", () => {
          setPillStateAnimated(card);
        });

        if (desktop) {
          card.addEventListener("mouseenter", () => {
            setPillStateAnimated(card);
          });
        }
      });

      productCards.forEach((card) => {
        const icon = card.querySelector(".producto-icon");
        if (!icon) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            boxShadow: "0 24px 60px rgba(0,0,0,0.34)",
            duration: 0.28
          });
          gsap.to(icon, {
            scale: 1.08,
            rotate: 6,
            duration: 0.28,
            ease: "back.out(1.8)"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 20px 70px rgba(0, 0, 0, 0.28)",
            duration: 0.28
          });
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.24
          });
        });
      });

      document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { scale: 1.02, duration: 0.18, ease: "power1.out" });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { scale: 1, duration: 0.18, ease: "power1.out" });
        });
      });

      if (leonorShowcaseCards.length) {
        gsap.fromTo(
          leonorShowcaseCards,
          {
            autoAlpha: 0,
            yPercent: 10,
            scale: 0.92,
            clipPath: "inset(18% 18% 18% 18% round 30px)"
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 30px)",
            stagger: 0.12,
            duration: 0.95,
            ease: "power3.out"
          }
        );

        leonorShowcaseCards.forEach((card, index) => {
          gsap.to(card, {
            y: index === 0 ? -8 : index % 2 === 0 ? 10 : -12,
            rotate: index === 0 ? 0 : index % 2 === 0 ? 6 : -6,
            duration: 4 + index * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        });
      }

      if (leonorRevealBlocks.length && hasScrollTrigger) {
        gsap.set(leonorRevealBlocks, { y: 28 });
        ScrollTrigger.batch(leonorRevealBlocks, {
          start: "top 84%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.14,
              ease: "power3.out"
            })
        });
      } else if (leonorRevealBlocks.length) {
        gsap.set(leonorRevealBlocks, { autoAlpha: 1, clearProps: "all" });
      }

      if (leonorMomentCards.length && hasScrollTrigger) {
        gsap.set(leonorMomentCards, { y: 36 });
        ScrollTrigger.batch(leonorMomentCards, {
          start: "top 82%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out"
            })
        });
      } else if (leonorMomentCards.length) {
        gsap.set(leonorMomentCards, { autoAlpha: 1, clearProps: "all" });
      }

      leonorMomentCards.forEach((card) => {
        const image = card.querySelector("img");
        const copy = card.querySelector(".leonor-moment-copy");
        if (!image || !copy) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.08, duration: 0.45, ease: "power2.out" });
          gsap.to(copy, { y: -10, duration: 0.32, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.45, ease: "power2.out" });
          gsap.to(copy, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      const spreadLeonorStack = (stack, expanded) => {
        if (!stack) return;
        const frames = stack.querySelectorAll("[data-leonor-frame]");
        frames.forEach((frame, index) => {
          const tilt = Number.parseFloat(frame.dataset.tilt || "0");
          const xValues = [-24, 0, 24];
          const activeX = xValues[index] ?? 0;
          gsap.to(frame, {
            xPercent: expanded ? activeX : 0,
            yPercent: expanded ? (index === 1 ? -2 : 2) : 0,
            rotation: expanded ? tilt : 0,
            scale: expanded ? (index === 1 ? 1.02 : 0.98) : 1,
            zIndex: expanded ? (index === 1 ? 3 : 2) : index + 1,
            duration: 0.45,
            ease: "power2.out"
          });
        });
      };

      leonorStacks.forEach((stack) => {
        const frames = stack.querySelectorAll("[data-leonor-frame]");
        if (!frames.length) return;

        gsap.fromTo(
          frames,
          {
            autoAlpha: 0,
            y: 24,
            scale: 0.94
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: hasScrollTrigger
              ? {
                  trigger: stack,
                  start: "top 82%",
                  once: true
                }
              : undefined
          }
        );

        if (!hasScrollTrigger) {
          gsap.set(frames, { autoAlpha: 1, clearProps: "all" });
        }

        spreadLeonorStack(stack, false);
        stack.addEventListener("mouseenter", () => spreadLeonorStack(stack, true));
        stack.addEventListener("mouseleave", () => spreadLeonorStack(stack, false));
      });

      if (originHeroCards.length) {
        gsap.set(originHeroCards, { y: 24 });
        gsap.fromTo(
          originHeroCards,
          {
            autoAlpha: 0,
            y: 40,
            scale: 0.92
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.14,
            duration: 0.8,
            ease: "power3.out"
          }
        );

        originHeroCards.forEach((card, index) => {
          gsap.to(card, {
            y: index % 2 === 0 ? -10 : 10,
            duration: 3.6 + index * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        });
      }

      if (originBands.length && hasScrollTrigger) {
        gsap.set(originBands, { y: 22 });
        ScrollTrigger.batch(originBands, {
          start: "top 84%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.16,
              ease: "power3.out"
            })
        });
      } else if (originBands.length) {
        gsap.set(originBands, { autoAlpha: 1, clearProps: "all" });
      }

      if (originEntries.length && hasScrollTrigger) {
        gsap.set(originEntries, { y: 44 });
        ScrollTrigger.batch(originEntries, {
          start: "top 82%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.16,
              ease: "power3.out"
            })
        });

        originEntries.forEach((entry) => {
          ScrollTrigger.create({
            trigger: entry,
            start: "top center",
            end: "bottom center",
            toggleClass: { targets: entry, className: "is-active" }
          });
        });
      } else if (originEntries.length) {
        gsap.set(originEntries, { autoAlpha: 1, clearProps: "all" });
      }

      if (originLineProgress && hasScrollTrigger) {
        gsap.fromTo(
          originLineProgress,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".origin-storyline",
              start: "top 24%",
              end: "bottom bottom",
              scrub: 0.8
            }
          }
        );
      } else if (originLineProgress) {
        gsap.set(originLineProgress, { scaleY: 1, transformOrigin: "top center" });
      }

      const resetOriginCollage = (collage) => {
        if (!collage) return;
        const shots = collage.querySelectorAll("[data-origin-shot]");
        shots.forEach((shot) => {
          shot.classList.remove("is-active");
          gsap.to(shot, {
            scale: 1,
            rotation: Number.parseFloat(shot.dataset.rotate || "0"),
            zIndex: 1,
            duration: 0.35,
            ease: "power2.out"
          });
        });
      };

      const activateOriginShot = (activeShot) => {
        const collage = activeShot.closest("[data-origin-collage]");
        if (!collage) return;

        const shots = collage.querySelectorAll("[data-origin-shot]");

        shots.forEach((shot) => {
          const isActive = shot === activeShot;
          shot.classList.toggle("is-active", isActive);

          gsap.to(shot, {
            scale: isActive ? 1.08 : 0.96,
            rotation: isActive ? 0 : Number.parseFloat(shot.dataset.rotate || "0"),
            zIndex: isActive ? 8 : 1,
            duration: 0.38,
            ease: "power2.out"
          });
        });
      };

      const originCollages = new Set();

      originShots.forEach((shot) => {
        shot.addEventListener("mouseenter", () => activateOriginShot(shot));
        shot.addEventListener("focusin", () => activateOriginShot(shot));
        shot.addEventListener("click", () => activateOriginShot(shot));

        const collage = shot.closest("[data-origin-collage]");
        if (collage) {
          originCollages.add(collage);
        }
      });

      originCollages.forEach((collage) => {
        collage.addEventListener("mouseleave", () => resetOriginCollage(collage));
      });
    }
  );
});
