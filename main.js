document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header scroll effect ---
    const header = document.getElementById('main-header');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();


    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        const toggleMenu = () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        };

        mobileToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // --- 3. Scroll Reveal Animations ---
    const animationTriggers = document.querySelectorAll('.animate-trigger');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.12
    });

    animationTriggers.forEach(el => revealObserver.observe(el));


    // --- 4. Solutions Accordion Interactive Switcher ---
    const solAccItems = document.querySelectorAll('.sol-acc-item');

    const initSolAccordions = () => {
        solAccItems.forEach(item => {
            const trigger = item.querySelector('.sol-acc-trigger');
            const content = item.querySelector('.sol-acc-content');
            if (!trigger || !content) return;
            
            if (item.classList.contains('active')) {
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            }
        });
    };

    // Run initially with a tiny delay to ensure layouts/images are computed
    setTimeout(initSolAccordions, 150);

    window.addEventListener('resize', initSolAccordions);

    solAccItems.forEach(item => {
        const trigger = item.querySelector('.sol-acc-trigger');
        const content = item.querySelector('.sol-acc-content');
        if (!trigger || !content) return;

        trigger.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            solAccItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.sol-acc-trigger');
                    const otherContent = otherItem.querySelector('.sol-acc-content');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });

            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });






    // --- 7. Contact Form Submit ---
    const contactForm = document.getElementById('project-contact-form');
    const successDialog = document.getElementById('success-dialog');
    const closeDialogBtn = document.getElementById('close-dialog-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && successDialog && closeDialogBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = 'Submitting... <i class="fa-solid fa-circle-notch fa-spin" style="margin-left: 8px;"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                successDialog.classList.add('show');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });

        closeDialogBtn.addEventListener('click', () => {
            successDialog.classList.remove('show');
        });

        successDialog.addEventListener('click', (e) => {
            if (e.target === successDialog) successDialog.classList.remove('show');
        });
    }


    // --- 8. Smooth Scroll with header offset ---
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: targetPosition - headerHeight - 10,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 9. Floating Menu Top/Bottom smooth scroll ---
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const btnScrollBottom = document.getElementById('btn-scroll-bottom');

    if (btnScrollTop) {
        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (btnScrollBottom) {
        btnScrollBottom.addEventListener('click', () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // --- 10. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherBtn = otherItem.querySelector('.faq-toggle-btn i');
                if (otherBtn) {
                    otherBtn.className = 'fa-solid fa-plus';
                }
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                const btnIcon = item.querySelector('.faq-toggle-btn i');
                if (btnIcon) {
                    btnIcon.className = 'fa-solid fa-xmark';
                }
            }
        });
    });

});
