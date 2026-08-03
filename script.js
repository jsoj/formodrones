document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
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

        // Close mobile menu on click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- Stats Counter Animation --- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();

        if (rect.top <= window.innerHeight && !animated) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentVal = progress * target;

                    stat.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };

                requestAnimationFrame(updateCount);
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check

    /* --- Interactive Budget Calculator --- */
    const serviceType = document.getElementById('service-type');
    const areaGroup = document.getElementById('area-group');
    const areaSize = document.getElementById('area-size');
    const areaVal = document.getElementById('area-val');
    const calculatedPrice = document.getElementById('calculated-price');
    const sendWhatsappCalc = document.getElementById('send-whatsapp-calc');

    const addRtk = document.getElementById('add-rtk');
    const addVideo = document.getElementById('add-video');
    const addUrgent = document.getElementById('add-urgent');

    const calculateBudget = () => {
        const type = serviceType.value;
        const hectares = parseInt(areaSize.value);
        let basePrice = 0;

        if (type === 'agri') {
            areaGroup.style.display = 'block';
            areaVal.textContent = `${hectares} ha`;
            basePrice = Math.max(500, hectares * 12);
        } else if (type === 'topografia') {
            areaGroup.style.display = 'block';
            areaVal.textContent = `${hectares} ha`;
            basePrice = Math.max(700, hectares * 18);
        } else if (type === 'imovel') {
            areaGroup.style.display = 'none';
            basePrice = 850;
        } else if (type === 'obras') {
            areaGroup.style.display = 'none';
            basePrice = 1800;
        }

        // Add-ons
        let extras = 0;
        if (addRtk && addRtk.checked) extras += parseInt(addRtk.value);
        if (addVideo && addVideo.checked) extras += parseInt(addVideo.value);
        if (addUrgent && addUrgent.checked) extras += parseInt(addUrgent.value);

        const totalPrice = Math.round(basePrice + extras);
        calculatedPrice.textContent = totalPrice.toLocaleString('pt-BR');
    };

    if (serviceType && areaSize) {
        serviceType.addEventListener('change', calculateBudget);
        areaSize.addEventListener('input', calculateBudget);
        if (addRtk) addRtk.addEventListener('change', calculateBudget);
        if (addVideo) addVideo.addEventListener('change', calculateBudget);
        if (addUrgent) addUrgent.addEventListener('change', calculateBudget);

        calculateBudget(); // Initial calculation
    }

    // Send budget to WhatsApp
    if (sendWhatsappCalc) {
        sendWhatsappCalc.addEventListener('click', () => {
            const typeText = serviceType.options[serviceType.selectedIndex].text;
            const areaText = serviceType.value === 'agri' || serviceType.value === 'topografia' ? `Área: ${areaSize.value} Hectares\n` : '';
            const price = calculatedPrice.textContent;

            let message = `*Simulação de Orçamento - FormoDrones*\n\n`;
            message += `*Serviço:* ${typeText}\n`;
            if (areaText) message += `*${areaText}*`;
            message += `*Valor Estimado no Site:* R$ ${price}\n\n`;
            message += `Gostaria de agendar uma consulta técnica para confirmar a viabilidade!`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/5561999999999?text=${encodedMsg}`, '_blank');
        });
    }

    /* --- Accordion FAQ --- */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('active');
            }
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
            message += `*Mensagem:* ${msg}`;

            const encodedMsg = encodeURIComponent(message);
            window.open(`https://wa.me/5561999999999?text=${encodedMsg}`, '_blank');
        });
    }
});
