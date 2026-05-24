/* ==========================================================================
   BT Banana — Interactions & Animations (Fixed)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Mobile Navigation ─────────────────────────────────────────── */
    const burger     = document.getElementById('burger');
    const navMenu    = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navItems   = document.querySelectorAll('.nav-link, .nav-wa, .nav-cta-btn');

    function closeNav() {
        burger.classList.remove('open');
        navMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
            closeNav();
        } else {
            burger.classList.add('open');
            navMenu.classList.add('open');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    navOverlay.addEventListener('click', closeNav);

    navItems.forEach(link => {
        link.addEventListener('click', closeNav);
    });

    /* ── Navbar Scroll + Progress Bar ─────────────────────────────── */
    const navbar      = document.getElementById('navbar');
    const progressBar = document.getElementById('scrollProgress');

    function handleScroll() {
        const scrollY   = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        progressBar.style.width = progress + '%';
        navbar.classList.toggle('scrolled', scrollY > 60);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ── Scroll Reveal — ALL animation classes ─────────────────────── */
    const animatedEls = document.querySelectorAll(
        '.slant-in, .appear-up, .appear-left, .appear-right'
    );

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    animatedEls.forEach(el => revealObs.observe(el));

    /* ── Hero elements fire immediately on load ────────────────────── */
    // Hero content starts visible without waiting for scroll
    document.querySelectorAll('.hero .slant-in, .hero .appear-up').forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 100 + i * 120);
    });

    /* ── Number Counter ───────────────────────────────────────────── */
    const counters = document.querySelectorAll('.counter');

    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el       = entry.target;
            const target   = +el.dataset.target;
            const duration = 1600;
            const start    = performance.now();

            function update(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased    = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target;
            }

            requestAnimationFrame(update);
            countObs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => countObs.observe(el));

    /* ── Contact Form Submit ──────────────────────────────────────── */
    window.handleFormSubmit = function(event) {
        event.preventDefault();

        const btn       = document.getElementById('submitBtn');
        const textEl    = btn.querySelector('.btn-txt');
        const successEl = btn.querySelector('.btn-ok');

        if (!btn || !textEl || !successEl) return;

        btn.disabled = true;
        textEl.style.display = 'none';
        successEl.style.display = 'flex';
        successEl.style.alignItems = 'center';
        successEl.style.gap = '8px';

        setTimeout(() => {
            btn.disabled = false;
            textEl.style.display = 'flex';
            textEl.style.alignItems = 'center';
            textEl.style.gap = '8px';
            successEl.style.display = 'none';
            event.target.reset();
        }, 3000);
    };

    /* ── Floating WhatsApp — hide when contact section visible ───── */
    const floatWa    = document.getElementById('floatWa');
    const contactSec = document.getElementById('contact');

    if (floatWa && contactSec) {
        const waObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                floatWa.style.opacity       = entry.isIntersecting ? '0' : '1';
                floatWa.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
            });
        }, { threshold: 0.2 });
        waObs.observe(contactSec);
    }

    /* ── Ticker pause on hover ────────────────────────────────────── */
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        ticker.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        ticker.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }

});
