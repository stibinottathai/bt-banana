/* ==========================================================================
   BT Banana — Interactions & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Mobile Navigation ───────────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    const navItems  = document.querySelectorAll('.nav-link, .nav-cta');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    /* ── Navbar Scroll + Progress Bar ──────────────────────────────── */
    const navbar      = document.getElementById('navbar');
    const progressBar = document.getElementById('scrollProgress');

    const handleScroll = () => {
        const scrollY  = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        progressBar.style.width = `${progress}%`;
        navbar.classList.toggle('scrolled', scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    /* ── Scroll Reveal (Intersection Observer) ──────────────────────── */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    /* ── Number Counter Animation ───────────────────────────────────── */
    const counters = document.querySelectorAll('.counter');

    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el     = entry.target;
            const target = +el.dataset.target;
            const duration = 1800; // ms
            const start    = performance.now();

            const update = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target;
            };

            requestAnimationFrame(update);
            countObs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => countObs.observe(el));

    /* ── Contact Form Submit ─────────────────────────────────────────── */
    // exposed to global so inline onsubmit can call it
    window.handleFormSubmit = function(event) {
        event.preventDefault();

        const btn      = document.getElementById('submitBtn');
        const textEl   = btn.querySelector('.btn-text');
        const successEl = btn.querySelector('.btn-success');

        btn.disabled = true;
        textEl.style.display = 'none';
        successEl.style.display = 'flex';

        // Simulate submission delay, then reset
        setTimeout(() => {
            btn.disabled = false;
            textEl.style.display = 'flex';
            successEl.style.display = 'none';
            event.target.reset();
        }, 3000);
    };

    /* ── Floating WhatsApp — hide on contact section ────────────────── */
    const floatWa      = document.getElementById('floatWa');
    const contactSec   = document.getElementById('contact');

    if (floatWa && contactSec) {
        const waObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                floatWa.style.opacity = entry.isIntersecting ? '0' : '1';
                floatWa.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
            });
        }, { threshold: 0.3 });

        waObs.observe(contactSec);
    }

    /* ── Smooth image parallax on hero ──────────────────────────────── */
    const heroBgImg = document.querySelector('.hero-bg-img');
    if (heroBgImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroH = document.querySelector('.hero').offsetHeight;
            if (scrolled < heroH) {
                const shift = scrolled * 0.3;
                heroBgImg.style.transform = `translateY(${shift}px)`;
            }
        }, { passive: true });
    }

});
