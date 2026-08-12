/* ========================================
   HCTECH PREMIUM JAVASCRIPT v5.0
   تمیز • کارآمد • بدون باگ
   ======================================== */

const HCTech = {
    init() {
        this.setExamLink();
        this.mobileMenu();
        this.headerScroll();
        this.dropdowns();
        this.scrollReveal();
        this.counterAnimation();
        this.smoothScroll();
        this.formValidation();
        this.backToTop();
        this.scrollProgress();
        this.parallax();
        this.magneticButtons();
    },

    /* ==========================================
       Mobile Menu — slide-in از راست
       ========================================== */
    mobileMenu() {
        const headerContainer = document.querySelector('.header-container');
        const nav = document.querySelector('.header nav');
        if (!headerContainer || !nav) return;

        // ساخت دکمه همبرگر
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        headerContainer.appendChild(hamburger);

        // ساخت منوی موبایل
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        // کپی لینک‌های اصلی
        const mainLinks = nav.querySelectorAll('ul > li > a');
        mainLinks.forEach(link => {
            const clone = link.cloneNode(true);
            clone.addEventListener('click', () => this.closeMobileMenu(hamburger, mobileMenu, overlay));
            mobileMenu.appendChild(clone);
        });

        // کپی لینک‌های dropdown (خدمات) — مستقیم بدون divider
        const dropdownLinks = nav.querySelectorAll('.dropdown-content a');
        if (dropdownLinks.length > 0) {
            dropdownLinks.forEach(link => {
                const clone = link.cloneNode(true);
                clone.style.paddingRight = '30px';
                clone.style.fontSize = '0.9rem';
                clone.addEventListener('click', () => this.closeMobileMenu(hamburger, mobileMenu, overlay));
                mobileMenu.appendChild(clone);
            });
        }

        document.body.appendChild(mobileMenu);

        // ساخت overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // باز و بسته کردن
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.contains('active');
            if (isOpen) {
                this.closeMobileMenu(hamburger, mobileMenu, overlay);
            } else {
                hamburger.classList.add('active');
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        overlay.addEventListener('click', () => {
            this.closeMobileMenu(hamburger, mobileMenu, overlay);
        });
    },


    setExamLink() {
        const examLinks = document.querySelectorAll('.exam-btn');
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const examUrl = isLocal ? 'http://localhost:3000/exams' : '/exams';
        examLinks.forEach(link => {
            link.setAttribute('href', examUrl);
        });
    },


    closeMobileMenu(hamburger, mobileMenu, overlay) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    /* ==========================================
       Header Scroll
       ========================================== */
    headerScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }, { passive: true });
    },

    /* ==========================================
       Dropdowns — پایداری hover
       ========================================== */
    dropdowns() {
        // Dropdown با CSS hover کار می‌کنه
        // فقط برای موبایل touch behavior اضافه می‌کنیم
        const dropdownTriggers = document.querySelectorAll('.dropdown-btn');

        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    const content = parent.querySelector('.dropdown-content');

                    // close all others
                    document.querySelectorAll('.dropdown-content').forEach(dc => {
                        if (dc !== content) {
                            dc.style.opacity = '0';
                            dc.style.visibility = 'hidden';
                            dc.style.transform = 'translateY(-6px)';
                            dc.style.pointerEvents = 'none';
                        }
                    });

                    // toggle current
                    const isOpen = content.style.opacity === '1';
                    if (isOpen) {
                        content.style.opacity = '0';
                        content.style.visibility = 'hidden';
                        content.style.transform = 'translateY(-6px)';
                        content.style.pointerEvents = 'none';
                    } else {
                        content.style.opacity = '1';
                        content.style.visibility = 'visible';
                        content.style.transform = 'translateY(0)';
                        content.style.pointerEvents = 'auto';
                    }
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown') && window.innerWidth <= 991) {
                document.querySelectorAll('.dropdown-content').forEach(dc => {
                    dc.style.opacity = '0';
                    dc.style.visibility = 'hidden';
                    dc.style.transform = 'translateY(-6px)';
                    dc.style.pointerEvents = 'none';
                });
            }
        });
    },

    /* ==========================================
       Scroll Reveal — Intersection Observer
       ========================================== */
    scrollReveal() {
        const revealElements = document.querySelectorAll(
            '.fade-in-up, .fade-in, .slide-in-right, .slide-in-left, .scale-in, .stagger-children'
        );
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    },

    /* ==========================================
       Counter Animation — شمارنده اعداد
       ========================================== */
    counterAnimation() {
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
       Smooth Scroll
       ========================================== */
    smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 68;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight - 16;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /* ==========================================
       Form Validation
       ========================================== */
    formValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // پاک کردن خطاهای قبلی
                form.querySelectorAll('.field-error').forEach(el => el.remove());
                form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

                const requiredInputs = form.querySelectorAll('input[required], textarea[required]');

                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        this.showFieldError(input, 'این فیلد الزامی است');
                    }

                    if (input.type === 'email' && input.value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            input.classList.add('error');
                            this.showFieldError(input, 'ایمیل معتبر نیست');
                        }
                    }
                });

                if (isValid) {
                    this.submitForm(form);
                }
            });
        });
    },

    showFieldError(input, message) {
        const error = document.createElement('span');
        error.className = 'field-error';
        error.textContent = message;
        error.style.cssText = `
            color: #e74c3c;
            font-size: 0.75rem;
            margin-top: 4px;
            display: block;
            text-align: right;
        `;
        input.parentNode.appendChild(error);
        input.style.borderColor = '#e74c3c';

        setTimeout(() => {
            input.style.borderColor = '';
        }, 2000);
    },

    submitForm(form) {
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'در حال ارسال...';

        setTimeout(() => {
            btn.textContent = '✓ ارسال شد';
            btn.style.background = '#27ae60';
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    },

    /* ==========================================
       Back to Top Button
       ========================================== */
    backToTop() {
        const btn = document.createElement('div');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.title = 'بازگشت به بالا';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 600) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    /* ==========================================
       Scroll Progress Bar
       ========================================== */
    scrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            bar.style.width = progress + '%';
        }, { passive: true });
    },

    /* ==========================================
       Parallax — عمق‌بخشی نرم
       ========================================== */
    parallax() {
        const elements = document.querySelectorAll('.parallax');
        if (!elements.length) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
                const yPos = scrolled * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    },

    /* ==========================================
       Magnetic Buttons
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
   DOM Ready
   ========================================== */
document.addEventListener('DOMContentLoaded', () => HCTech.init());