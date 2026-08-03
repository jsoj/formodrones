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

    /* --- Interactive Budget Calculator --- */
    const serviceType = document.getElementById('service-type');
    const areaGroup = document.getElementById('area-group');
    const areaSize = document.getElementById('area-size');
    const areaVal = document.getElementById('area-val');
    const calculatedPrice = document.getElementById('calculated-price');
    const sendWhatsappCalc = document.getElementById('send-whatsapp-calc');

    const addRtk = document.getElementById('add-rtk');
    const addRelatorio = document.getElementById('add-relatorio');
    const addUrgent = document.getElementById('add-urgent');

    const calculateBudget = () => {
        if (!serviceType || !areaSize) return;

        const type = serviceType.value;
        const hectares = parseInt(areaSize.value);
        let basePrice = 0;

        if (type === 'pulverizacao') {
            areaGroup.style.display = 'block';
            areaVal.textContent = `${hectares} ha`;
            basePrice = Math.max(600, hectares * 15);
        } else if (type === 'agri') {
            areaGroup.style.display = 'block';
            areaVal.textContent = `${hectares} ha`;
            basePrice = Math.max(500, hectares * 12);
        } else if (type === 'topografia') {
            areaGroup.style.display = 'block';
            areaVal.textContent = `${hectares} ha`;
            basePrice = Math.max(750, hectares * 18);
        } else if (type === 'imovel') {
            areaGroup.style.display = 'none';
            basePrice = 850;
        }

        // Add-ons
        let extras = 0;
        if (addRtk && addRtk.checked) extras += parseInt(addRtk.value);
        if (addRelatorio && addRelatorio.checked) extras += parseInt(addRelatorio.value);
        if (addUrgent && addUrgent.checked) extras += parseInt(addUrgent.value);

        const totalPrice = Math.round(basePrice + extras);
        calculatedPrice.textContent = totalPrice.toLocaleString('pt-BR');
    };

    if (serviceType && areaSize) {
        serviceType.addEventListener('change', calculateBudget);
        areaSize.addEventListener('input', calculateBudget);
        if (addRtk) addRtk.addEventListener('change', calculateBudget);
        if (addRelatorio) addRelatorio.addEventListener('change', calculateBudget);
        if (addUrgent) addUrgent.addEventListener('change', calculateBudget);

        calculateBudget();
    }

    // Send budget simulation to WhatsApp (Marco Antonio)
    if (sendWhatsappCalc) {
        sendWhatsappCalc.addEventListener('click', () => {
            const typeText = serviceType.options[serviceType.selectedIndex].text;
            const areaText = serviceType.value !== 'imovel' ? `Área: ${areaSize.value} Hectares\n` : '';
            const price = calculatedPrice.textContent;

            let message = `*Simulação de Orçamento - FormoDrones*\n\n`;
            message += `*Cliente:* Contato via Website\n`;
            message += `*Operação:* ${typeText}\n`;
            if (areaText) message += `*${areaText}*`;
            message += `*Investimento Estimado:* R$ ${price}\n\n`;
            message += `Olá Marco Antonio! Gostaria de agendar uma consulta técnica para confirmar os detalhes da minha área.`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/5561999757738?text=${encodedMsg}`, '_blank');
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

    /* --- Contact Form WhatsApp --- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const interest = document.getElementById('contact-interest').value;
            const msg = document.getElementById('contact-msg').value;

            let message = `*Nova Mensagem pelo Site - FormoDrones*\n\n`;
            message += `*Nome:* ${name}\n`;
            message += `*Telefone/WhatsApp:* ${phone}\n`;
            message += `*Interesse:* ${interest}\n`;
            message += `*Mensagem:* ${msg}\n\n`;
            message += `Olá Marco Antonio, aguardo seu retorno!`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/5561999757738?text=${encodedMsg}`, '_blank');
        });
    }
});
