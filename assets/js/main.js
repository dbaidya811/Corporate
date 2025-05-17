/**
 * NexusCorp - Modern Corporate Website
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize 3D backgrounds
    init3DBackgrounds();
    
    // Initialize animations
    initAnimations();
    
    // Initialize sliders
    initSliders();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize portfolio modals
    initPortfolioModals();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize contact form
    initContactForm();
});

/**
 * Loading Screen
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time (remove in production and use actual asset loading)
    setTimeout(() => {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Enable scrolling on body
        document.body.style.overflow = 'visible';
        
        // Trigger initial animations
        animateHeroElements();
    }, 2000);
    
    // Animate loading dots
    const dots = document.querySelector('.dots');
    let dotCount = 0;
    
    setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        dots.textContent = '.'.repeat(dotCount);
    }, 500);
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle menu toggle for mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * 3D Backgrounds with Three.js
 */
function init3DBackgrounds() {
    // Hero Canvas
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        createParticleBackground(heroCanvas, 0x6c63ff, 0x00e5ff);
    }
    
    // Header Canvas
    const headerCanvas = document.getElementById('header-canvas');
    if (headerCanvas) {
        createParticleBackground(headerCanvas, 0x4d44db, 0x6c63ff);
    }
}

function createParticleBackground(canvas, color1, color2) {
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    
    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill arrays with random positions and scales
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i + 1] = (Math.random() - 0.5) * 100;
        posArray[i + 2] = (Math.random() - 0.5) * 100;
        
        // Scale
        scaleArray[i / 3] = Math.random();
    }
    
    // Set attributes
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        vertexColors: true
    });
    
    // Create color array
    const colors = new Float32Array(particlesCount * 3);
    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        const mixedColor = color1Obj.clone().lerp(color2Obj, Math.random());
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}

/**
 * Animations
 */
function initAnimations() {
    // Parallax effect for images
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(element => {
            const depth = 20;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            gsap.to(element, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('fade-in');
                    
                    if (animation === 'fade-up') {
                        element.classList.add('fade-in-up');
                    } else if (animation === 'fade-right') {
                        element.classList.add('fade-in-right');
                    }
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Hero Animations
 */
function animateHeroElements() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroText = heroContent.querySelector('p');
        const ctaButtons = heroContent.querySelector('.cta-buttons');
        
        gsap.fromTo(heroTitle, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
        
        gsap.fromTo(heroText, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
        );
        
        gsap.fromTo(ctaButtons, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
        );
    }
}

/**
 * Sliders
 */
function initSliders() {
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Create dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Initialize slider
        updateSlider();
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            });
        }
        
        // Auto slide
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
        
        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000);
        });
        
        // Helper functions
        function updateSlider() {
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.style.display = 'block';
                    gsap.fromTo(slide, 
                        { opacity: 0, x: 50 }, 
                        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
                    );
                } else {
                    slide.style.display = 'none';
                }
            });
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
    }
}

/**
 * Portfolio Filters
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        gsap.to(item, { 
                            scale: 1, 
                            opacity: 1, 
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => {
                                item.style.display = 'block';
                            }
                        });
                    } else {
                        gsap.to(item, { 
                            scale: 0.8, 
                            opacity: 0, 
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => {
                                item.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }
}

/**
 * Portfolio Modals
 */
function initPortfolioModals() {
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    if (portfolioLinks.length && modals.length) {
        // Open modal
        portfolioLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetModal = document.querySelector(link.getAttribute('href'));
                
                if (targetModal) {
                    targetModal.style.display = 'flex';
                    
                    gsap.fromTo(targetModal, 
                        { opacity: 0 }, 
                        { opacity: 1, duration: 0.3, ease: 'power2.out' }
                    );
                    
                    gsap.fromTo(targetModal.querySelector('.modal-content'), 
                        { y: 50, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
                    );
                    
                    // Disable scrolling on body
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.portfolio-modal');
                
                gsap.to(modal, { 
                    opacity: 0, 
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        modal.style.display = 'none';
                        
                        // Enable scrolling on body
                        document.body.style.overflow = 'visible';
                    }
                });
            });
        });
        
        // Close modal when clicking outside content
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    gsap.to(modal, { 
                        opacity: 0, 
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            modal.style.display = 'none';
                            
                            // Enable scrolling on body
                            document.body.style.overflow = 'visible';
                        }
                    });
                }
            });
        });
    }
}

/**
 * FAQ Accordions
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            // Set initial state
            answer.style.height = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'height 0.3s ease';
            
            question.addEventListener('click', () => {
                // Toggle current item
                const isOpen = item.classList.contains('active');
                
                if (isOpen) {
                    // Close item
                    item.classList.remove('active');
                    answer.style.height = '0';
                    toggle.innerHTML = '<i class="fas fa-plus"></i>';
                } else {
                    // Open item
                    item.classList.add('active');
                    answer.style.height = answer.scrollHeight + 'px';
                    toggle.innerHTML = '<i class="fas fa-minus"></i>';
                }
            });
        });
    }
}

/**
 * Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form (basic validation)
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                
                if (!formValues[field] || formValues[field].trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formValues.email && !emailRegex.test(formValues.email)) {
                isValid = false;
                contactForm.querySelector('[name="email"]').classList.add('error');
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For demo purposes, we'll just show a success message
                
                // Disable form
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate server request
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully. We\'ll get back to you soon!';
                    
                    contactForm.appendChild(successMessage);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    }, 5000);
                }, 1500);
            }
        });
    }
}
