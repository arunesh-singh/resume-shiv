gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // ================= JULIAN THORNE SPLIT HERO ANIMATION =================
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 }});

    heroTl.from(".navbar", { y: -50, opacity: 0, duration: 1 })
      .from(".hero-left", { x: -50, opacity: 0 }, "-=0.5")
      .from(".hero-right", { x: 50, opacity: 0 }, "-=1")
      .from(".hero-supertitle", { y: 20, opacity: 0 }, "-=0.8")
      .from(".hero-title", { y: 30, opacity: 0, skewY: 2 }, "-=1")
      .from(".hero-desc", { y: 20, opacity: 0 }, "-=0.8")
      .from(".hero-buttons", { y: 20, opacity: 0 }, "-=0.8")
      .from(".hero-stats", { y: 20, opacity: 0 }, "-=0.8")
      .from(".mask-asymmetric", { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
          opacity: 0, 
          duration: 1.5,
          ease: "expo.inOut" 
      }, "-=1.5")
      .from(".floating-card", { 
          y: 40, 
          opacity: 0, 
          stagger: 0.2, 
          ease: "back.out(1.7)" 
      }, "-=1");

    // ================= MOUSE PARALLAX ON HERO RIGHT =================
    const heroRight = document.querySelector('.hero-right');
    const cards = document.querySelectorAll('.floating-card');

    if (heroRight) {
        heroRight.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 25;
            const y = (window.innerHeight / 2 - e.clientY) / 25;

            cards.forEach(card => {
                const speed = card.getAttribute('data-speed') || 1;
                gsap.to(card, {
                    x: x * speed,
                    y: y * speed,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    }

    // ================= HORIZONTAL SCROLL EXPERIENCE =================
    const horizontalSection = document.querySelector(".experience-section");
    const horizontalContainer = document.querySelector(".experience-horizontal");

    if (horizontalSection && horizontalContainer) {
        // Only enable on Desktop/Tablet if width > 768px
        ScrollTrigger.matchMedia({
            "(min-width: 769px)": function() {
                // Calculate scroll amount: total width - viewport width
                let scrollAmount = horizontalContainer.scrollWidth - window.innerWidth;
                
                gsap.to(horizontalContainer, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalSection,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (document.querySelectorAll(".exp-panel").length - 1),
                        end: () => "+=" + horizontalContainer.scrollWidth,
                        invalidateOnRefresh: true
                    }
                });
            },
            "(max-width: 768px)": function() {
                // Mobile behavior: Vertical scroll (CSS handles layout, JS does nothing or simple reveals)
                gsap.utils.toArray('.exp-panel').forEach((panel) => {
                    gsap.from(panel, {
                        scrollTrigger: {
                            trigger: panel,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1
                    });
                });
            } 
        });
    }

    // ================= EXPERTISE GRID ANIMATION =================
    const expertiseSection = document.querySelector('.expertise-section');
    if (expertiseSection) {
        gsap.from(".bento-card", {
            scrollTrigger: {
                trigger: ".expert-grid",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.from(".expertise-header", {
            scrollTrigger: {
                trigger: ".expertise-section",
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    // ================= SMOOTH SCROLL TO ANCHORS =================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                // Determine offset based on target
                // For experience section (pinned), we might need special handling or just scroll to top
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: target, offsetY: 0 },
                    ease: "power4.inOut"
                });
            }
        });
    });
});
