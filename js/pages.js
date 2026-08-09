/* ========================================
   HCTECH PAGES JAVASCRIPT v1.0
   Tab System • Timeline • Carousel • Counters
   ======================================== */

const HCTechPages = {
    init() {
        this.tabSystem();
        this.processTabs();
        this.carousel();
        this.counters();
        this.magneticButtons();
    },

    /* ==========================================
       TAB SYSTEM
       ========================================== */
    tabSystem() {
        const tabNavs = document.querySelectorAll('.tab-nav');

        tabNavs.forEach(nav => {
            const buttons = nav.querySelectorAll('.tab-btn');
            const contents = document.querySelectorAll('.tab-content');

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.getAttribute('data-tab');

                    // Remove active from all buttons in this nav
                    buttons.forEach(b => b.classList.remove('active'));
                    // Add active to clicked
                    btn.classList.add('active');

                    // Hide all contents
                    contents.forEach(c => c.classList.remove('active'));
                    // Show target
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.classList.add('active');
                        // Animate in
                        target.style.opacity = '0';
                        target.style.transform = 'translateY(10px)';
                        requestAnimationFrame(() => {
                            target.style.transition = 'all 0.3s ease';
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                        });
                    }
                });
            });
        });
    },

    /* ==========================================
       PROCESS TABS
       ========================================== */
    processTabs() {
        const steps = document.querySelectorAll('.process-step[data-tab]');
        const contents = document.querySelectorAll('.process-content');

        steps.forEach(step => {
            step.addEventListener('click', () => {
                const targetId = step.getAttribute('data-tab');

                // Update active step
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');

                // Show target content
                contents.forEach(c => c.classList.remove('active'));
                const target = document.getElementById(targetId);
                if (target) {
                    target.classList.add('active');
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(10px)';
                    requestAnimationFrame(() => {
                        target.style.transition = 'all 0.3s ease';
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    });
                }
            });
        });
    },

    /* ==========================================
       CAROUSEL
       ========================================== */
    carousel() {
        const carousels = document.querySelectorAll('.carousel-wrapper');

        carousels.forEach(wrapper => {
            const slides = wrapper.querySelectorAll('.carousel-slide');
            const dots = wrapper.parentElement.querySelectorAll('.carousel-dot');
            const prevBtn = wrapper.parentElement.querySelector('.carousel-prev');
            const nextBtn = wrapper.parentElement.querySelector('.carousel-next');

            if (!slides.length) return;

            let current = 0;
            let autoplay;

            const showSlide = (index) => {
                slides.forEach(s => s.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active'));

                slides[index].classList.add('active');
                if (dots[index]) dots[index].classList.add('active');
                current = index;
            };

            const nextSlide = () => {
                const next = (current + 1) % slides.length;
                showSlide(next);
            };

            const prevSlide = () => {
                const prev = (current - 1 + slides.length) % slides.length;
                showSlide(prev);
            };

            const startAutoplay = () => {
                autoplay = setInterval(nextSlide, 5000);
            };

            const stopAutoplay = () => {
                clearInterval(autoplay);
            };

            if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });
            if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => { showSlide(index); stopAutoplay(); startAutoplay(); });
            });

            wrapper.addEventListener('mouseenter', stopAutoplay);
            wrapper.addEventListener('mouseleave', startAutoplay);

            startAutoplay();
        });
    },

    /* ==========================================
       COUNTERS
       ========================================== */
    counters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;

            const duration = 2000;
            const startTime = performance.now();

            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const current = Math.round(target * easedProgress);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => observer.observe(counter));
    },

    /* ==========================================
       MAGNETIC BUTTONS
       ========================================== */
    magneticButtons() {
        const buttons = document.querySelectorAll('.magnetic');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const strength = 0.25;

                btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
};

/* ==========================================
   DOM READY
   ========================================== */
document.addEventListener('DOMContentLoaded', () => HCTechPages.init());