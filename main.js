document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-full-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Calculator
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        const contentType = document.getElementById('contentType');
        const contentCount = document.getElementById('contentCount');
        const urgency = document.getElementById('urgency');
        const resultPrice = document.getElementById('resultPrice');
        
        function calculatePrice() {
            if (!contentType || !contentCount || !urgency || !resultPrice) return;
            
            const basePrices = {
                'photo': 500,
                'video': 2000,
                'audio': 1500,
                'package': 3500
            };
            
            const count = parseInt(contentCount.value) || 1;
            const urgencyMultiplier = urgency.value === 'urgent' ? 1.5 : 1;
            
            const basePrice = basePrices[contentType.value] || 500;
            const total = basePrice * count * urgencyMultiplier;
            
            resultPrice.textContent = `от ${total.toLocaleString('ru-RU')} ₽`;
        }
        
        contentType.addEventListener('change', calculatePrice);
        contentCount.addEventListener('input', calculatePrice);
        urgency.addEventListener('change', calculatePrice);
        
        // Initial calculation
        calculatePrice();
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('formSuccess');
            
            // Basic validation
            const name = formData.get('name');
            const contact = formData.get('contact');
            const message = formData.get('message');
            
            if (!name || !contact || !message) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Show success message
                successMsg.classList.add('show');
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }, 1500);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add parallax effect to hero (subtle)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroVisual = document.querySelector('.hero-card');
            if (heroVisual && scrolled < 600) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
});
