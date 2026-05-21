document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Scroll Animations
    const fadeElements = document.querySelectorAll('.service-card, .about-content, .about-image-wrapper, .trust-card, .contact-container');

    // Set initial state
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;

            setTimeout(() => {
                entry.target.classList.add('appear');
            }, index * 100);

            observer.unobserve(entry.target);
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Verzenden...';
            btn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                await fetch('https://formsubmit.co/8b0b7cd5c878c8c842de6b9028a16ff3', {
                    method: 'POST',
                    body: formData
                });

                setTimeout(() => {
                    btn.textContent = 'Bericht verzonden!';
                    btn.style.backgroundColor = 'var(--clr-accent)';
                    btn.style.color = '#fff';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 3000);
                }, 1000);
            } catch (error) {
                btn.textContent = 'Error - probeer later opnieuw';
                btn.style.backgroundColor = '#dc3545';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // Sticky Banner Logic
    const stickyBanner = document.getElementById('stickyBanner');
    const closeBannerBtn = document.getElementById('closeBannerBtn');

    if (stickyBanner && closeBannerBtn) {
        stickyBanner.classList.add('show');

        closeBannerBtn.addEventListener('click', () => {
            stickyBanner.classList.remove('show');
            stickyBanner.style.transform = 'translateX(120%)';
        });
    }
});
