// ===== FLOATING BACKGROUND ELEMENTS =====
function createFloatingElements() {
    const container = document.getElementById('floatingContainer');
    const elements = ['💖', '🧵', '✨', '🌸', '💕', '💎', '💃', '👗', '✂️', '🎀'];
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'floating-item';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 15 + 15) + 's';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        container.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 30000);
    }, 3000);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .review-card, .gallery-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '0.8';
        });
    });
}

// ===== PROGRESS BAR =====
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS (AOS Alternative) =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Animate counters if present
                if (entry.target.querySelector('.stat-number')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===== REVIEWS SLIDER =====
function initReviewsSlider() {
    const track = document.querySelector('.reviews-track');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // Including gap
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto-slide
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            goToSlide(currentIndex - 1);
        }
    });
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const heroImages = document.querySelectorAll('.float-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        heroImages.forEach((img, index) => {
            const speed = 0.5 + (index * 0.1);
            img.style.transform = `translateY(${scrolled * speed}px) rotate(${Math.sin(scrolled * 0.001) * 5}deg)`;
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== TILT EFFECT FOR CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ===== TEXT SCRAMBLE EFFECT =====
function initTextScramble() {
    const titles = document.querySelectorAll('.section-title');
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    titles.forEach(title => {
        const originalText = title.textContent;
        let iteration = 0;
        
        title.addEventListener('mouseenter', () => {
            const interval = setInterval(() => {
                title.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                
                iteration += 1/3;
            }, 30);
        });
    });
}

// ===== PARTICLE BUTTON EFFECT =====
function initParticleButtons() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const particles = 12;
            const particleContainer = this.querySelector('.btn-particles') || this;
            
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('span');
                particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    left: 50%;
                    top: 50%;
                `;
                
                const angle = (i / particles) * 360;
                const velocity = 100;
                const tx = Math.cos(angle * Math.PI / 180) * velocity;
                const ty = Math.sin(angle * Math.PI / 180) * velocity;
                
                particle.style.transform = 'translate(-50%, -50%)';
                particle.style.animation = `particle-fly 0.6s ease-out forwards`;
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                particleContainer.appendChild(particle);
                
                setTimeout(() => particle.remove(), 600);
            }
        });
    });
    
    // Add particle animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-fly {
            to {
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== GLITCH EFFECT =====
function initGlitchEffect() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    
    const originalText = logo.textContent;
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            const glitchText = originalText
                .split('')
                .map((char, i) => {
                    if (Math.random() > 0.8) {
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    }
                    return char;
                })
                .join('');
            
            logo.textContent = glitchText;
            
            setTimeout(() => {
                logo.textContent = originalText;
            }, 100);
        }
    }, 2000);
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    initCustomCursor();
    initProgressBar();
    initNavigation();
    initScrollAnimations();
    initReviewsSlider();
    initMagneticButtons();
    initParallax();
    initSmoothScroll();
    initTiltEffect();
    initTextScramble();
    initParticleButtons();
    initGlitchEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
