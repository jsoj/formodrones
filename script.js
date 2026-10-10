document.addEventListener('DOMContentLoaded', () => {

    /* --- Light / Dark Theme Switcher --- */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('formodrones_theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        htmlElement.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('formodrones_theme', newTheme);
        });
    }

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- Accordion FAQ --- */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            accordionItems.forEach(i => i.classList.remove('active'));
            if (!isOpen) item.classList.add('active');
        });
    });

    /* --- Contact Form WhatsApp (Marco Antonio ou Joao Marcello) --- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const target = document.getElementById('contact-contact-to')?.value || 'marco';
            const interest = document.getElementById('contact-interest').value;
            const msg = document.getElementById('contact-msg').value;

            const isJoao = target === 'joao';
            const targetName = isJoao ? 'Joao Marcello' : 'Marco Antonio';
            const targetPhone = isJoao ? '5561996307456' : '5561999757738';

            let message = `*Nova Mensagem pelo Site - FormoDrones*\n\n`;
            message += `*Nome:* ${name}\n`;
            message += `*Telefone/WhatsApp:* ${phone}\n`;
            message += `*Interesse:* ${interest}\n`;
            message += `*Mensagem:* ${msg}\n\n`;
            message += `Olá ${targetName}, vim pelo site da FormoDrones e aguardo seu retorno!`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/${targetPhone}?text=${encodedMsg}`, '_blank');
        });
    }
});
