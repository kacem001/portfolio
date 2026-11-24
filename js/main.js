/**
 * Portfolio Website - Main JavaScript
 * Handles all interactions, animations, and dynamic functionality
 */

(function() {
    'use strict';

    // =========================================================================
    // INITIALIZATION & LOADING
    // =========================================================================

    /**
     * Initialize all features when DOM is loaded
     */
    function init() {
        hideLoadingScreen();
        initCustomCursor();
        initNavigation();
        initTypingEffect();
        initProjectFilters();
        initProjectModals();
        initSkillAnimations();
        initScrollAnimations();
        initContactForm();
        initBackToTop();
        initSmoothScroll();
    }

    /**
     * Hide loading screen after page load
     */
    function hideLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }, 1000);
        });
    }

    // =========================================================================
    // CUSTOM CURSOR
    // =========================================================================

    /**
     * Initialize custom cursor effects
     */
    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });

        // Animate cursor with smooth following
        function animateCursor() {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add active state on clickable elements
        const clickables = document.querySelectorAll('a, button, .project-card, .tech-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    // =========================================================================
    // NAVIGATION
    // =========================================================================

    /**
     * Initialize navigation functionality
     */
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Hamburger menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // =========================================================================
    // TYPING EFFECT
    // =========================================================================

    /**
     * Initialize typing animation in hero section
     */
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const phrases = [
            'AI & Machine Learning Engineer',
            'Biomedical NLP & Vision Researcher',
            'Full Stack & Telegram Bot Developer',
            'Engineering Student @ Annaba University'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // =========================================================================
    // PROJECT FILTERING
    // =========================================================================

    /**
     * Initialize project filtering system
     */
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    setTimeout(() => {
                        if (filter === 'all' || category === filter) {
                            card.classList.remove('hide');
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        } else {
                            card.classList.add('hide');
                        }
                    }, index * 50);
                });
            });
        });
    }

    // =========================================================================
    // PROJECT MODALS
    // =========================================================================

    /**
     * Initialize project modal functionality
     */
    function initProjectModals() {
        const modal = document.getElementById('projectModal');
        const viewProjectBtns = document.querySelectorAll('.btn-view-project');
        const modalClose = document.querySelector('.modal-close');
        const modalOverlay = document.querySelector('.modal-overlay');

        // Project data
        const projectData = {
            1: {
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
                category: 'AI / Biomedical NLP',
                title: 'Biomedical Named Entity Recognition — Comparative Study',
                description: 'A comprehensive comparative NLP study evaluating four distinct neural approaches for Chemical and Disease entity recognition on the BC5CDR benchmark: PubMedBERT, BioLinkBERT, BiLSTM-CRF, and Mistral-7B-Instruct (4-bit quantized, prompt-based). Also developed NeuroMed NER, a Flask web application powered by Gemini 2.5 Flash for medical entity extraction (diseases, medications, procedures) featuring in-browser OCR and a dark-themed user interface.',
                details: [
                    'Built full NLP pipeline: data cleaning, balanced 70/20/10 split, BIO tagging, and fine-tuning',
                    'Entity-level evaluation with seqeval (precision, recall, and F1 per entity type)',
                    'PubMedBERT achieved the best overall result with 82.45% F1 (Chemical 88.75%, Disease 76.50%)',
                    'Followed by BioLinkBERT (81.29%), BiLSTM-CRF (60.62%), and Mistral-7B (49.60%)',
                    'Developed NeuroMed NER Flask web app using Gemini 2.5 Flash with in-browser OCR'
                ],
                tags: ['Python', 'PyTorch', 'PubMedBERT', 'Hugging Face', 'Flask', 'Gemini Flash', 'OCR'],
                liveDemo: '',
                codeUrl: 'https://github.com/kacem001'
            },
            2: {
                image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&h=600&fit=crop',
                category: 'Computer Vision / Deep Learning',
                title: 'Facial Recognition — Model Comparison & Interactive App',
                description: 'Designed, trained, and benchmarked multiple deep neural network architectures for facial recognition to select the highest-performing model. Engineered an interactive local testing application with a Python app.py backend and an intuitive index.html frontend for real-time model evaluation.',
                details: [
                    'Designed and compared multiple deep neural network architectures for face recognition',
                    'Built robust data preprocessing, face alignment, and image augmentation pipelines',
                    'Engineered an interactive local web testing application (Python backend + web frontend)',
                    'Validated recognition accuracy, inference latency, and feature embedding quality'
                ],
                tags: ['Python', 'Deep Learning', 'OpenCV', 'PyTorch', 'Flask', 'Computer Vision'],
                liveDemo: '',
                codeUrl: 'https://github.com/kacem001'
            },
            3: {
                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
                category: 'Web Application',
                title: 'UniGrade — Student Grade Calculator',
                description: 'Developed and deployed a responsive, client-side web application for Algerian university students to calculate semester GPA from subject credits and customizable TD, TP, and Exam weighting schemes.',
                details: [
                    'Customizable TD, TP, and Exam weighting distributions tailored for Algerian universities',
                    'Multi-semester management tabs with instant dynamic GPA calculation',
                    'JSON data import and export for effortless saving and restoration of grade configs',
                    'Printable grade reports and clean PDF export layout',
                    'Automatic local persistence with localStorage, plus responsive dark and light themes'
                ],
                tags: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'Responsive Web'],
                liveDemo: 'https://github.com/kacem001',
                codeUrl: 'https://github.com/kacem001'
            },
            4: {
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
                category: 'Telegram Bot / Automation',
                title: 'Morsely — Morse Code Telegram Bot',
                description: 'Developed a feature-packed Python Telegram bot that converts text to Morse code and Morse code back to text with automated direction detection, personalized user preferences, and cryptocurrency support.',
                details: [
                    'Automatic bidirectional detection of text-to-Morse and Morse-to-text input',
                    'Trilingual user interface supporting English, Arabic, and French',
                    'User preference settings for language and copied-text formatting',
                    'Integrated donation module supporting various cryptocurrency options'
                ],
                tags: ['Python', 'Telegram API', 'Automation', 'Multilingual', 'i18n'],
                liveDemo: '',
                codeUrl: 'https://github.com/kacem001'
            },
            5: {
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop',
                category: 'Telegram Bot / APIs',
                title: 'Telegram Weather Bot',
                description: 'Developed a multilingual (English, Arabic, French) Telegram bot providing current weather conditions and 3, 5, or 7-day forecasts by city name or shared location, featuring automated morning weather alerts.',
                details: [
                    'Real-time weather data and 3, 5, or 7-day forecasts via Open-Meteo REST API',
                    'Integrated OpenStreetMap Nominatim for fast and accurate geocoding',
                    'Automated morning alerts scheduled at user-chosen hours via background jobs',
                    'Celsius and Fahrenheit units toggle, refresh button, and per-user SQLite storage'
                ],
                tags: ['Python', 'SQLite', 'Open-Meteo API', 'Nominatim', 'Telegram API'],
                liveDemo: '',
                codeUrl: 'https://github.com/kacem001'
            },
            6: {
                image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&h=600&fit=crop',
                category: 'Web Application',
                title: 'VibeLink — Link-in-Bio Website',
                description: 'Designed and built a modern Linktree-style website that lets users, developers, and creators gather their important links, social accounts, and projects in a single beautiful, shareable page.',
                details: [
                    'Clean, responsive mobile-first design with smooth interactions and micro-animations',
                    'Unified hub for social channels, portfolio links, and quick communication',
                    'Customizable layout and theme accents with high shareability',
                    'Lightweight vanilla JavaScript architecture for lightning-fast loading'
                ],
                tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design', 'Responsive Web'],
                liveDemo: 'https://github.com/kacem001',
                codeUrl: 'https://github.com/kacem001'
            }
        };

        // Open modal
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const project = projectData[projectId];

                if (project) {
                    // Populate modal with project data
                    const modalImg = document.getElementById('modalImage');
                    if (modalImg && project.image) {
                        modalImg.src = project.image;
                    }
                    document.getElementById('modalCategory').textContent = project.category;
                    document.getElementById('modalTitle').textContent = project.title;
                    document.getElementById('modalDescription').textContent = project.description;

                    // Populate details list
                    const detailsList = document.getElementById('modalDetailsList');
                    detailsList.innerHTML = '';
                    project.details.forEach(detail => {
                        const li = document.createElement('li');
                        li.textContent = detail;
                        detailsList.appendChild(li);
                    });

                    // Populate tags
                    const tagsContainer = document.getElementById('modalTags');
                    tagsContainer.innerHTML = '';
                    project.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag;
                        tagsContainer.appendChild(span);
                    });

                    // Update action buttons
                    const modalDemoBtn = document.getElementById('modalDemoBtn');
                    const modalCodeBtn = document.getElementById('modalCodeBtn');
                    if (modalDemoBtn) {
                        if (project.liveDemo) {
                            modalDemoBtn.href = project.liveDemo;
                            modalDemoBtn.style.display = 'inline-flex';
                        } else {
                            modalDemoBtn.style.display = 'none';
                        }
                    }
                    if (modalCodeBtn) {
                        if (project.codeUrl) {
                            modalCodeBtn.href = project.codeUrl;
                            modalCodeBtn.style.display = 'inline-flex';
                        } else {
                            modalCodeBtn.style.display = 'none';
                        }
                    }

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // =========================================================================
    // SKILL ANIMATIONS
    // =========================================================================

    /**
     * Initialize skill progress bar animations
     */
    function initSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate progress bar
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const targetWidth = progressBar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 200);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        skillItems.forEach(item => observer.observe(item));
    }

    // =========================================================================
    // SCROLL ANIMATIONS
    // =========================================================================

    /**
     * Initialize scroll-triggered animations
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .project-card, .tech-card');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    // =========================================================================
    // CONTACT FORM
    // =========================================================================

    /**
     * Initialize contact form with validation
     */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const formInputs = {
            name: form.querySelector('#name'),
            email: form.querySelector('#email'),
            subject: form.querySelector('#subject'),
            message: form.querySelector('#message')
        };

        const formStatus = form.querySelector('.form-status');

        // Validation patterns
        const patterns = {
            name: /^[a-zA-Z\s]{2,50}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            subject: /^.{5,100}$/,
            message: /^.{10,500}$/
        };

        // Validation messages
        const messages = {
            name: 'Please enter a valid name (2-50 characters)',
            email: 'Please enter a valid email address',
            subject: 'Subject must be 5-100 characters',
            message: 'Message must be 10-500 characters'
        };

        /**
         * Validate single field
         */
        function validateField(field, pattern, message) {
            const value = field.value.trim();
            const formGroup = field.closest('.form-group');
            const errorMsg = formGroup.querySelector('.error-message');

            if (!pattern.test(value)) {
                formGroup.classList.add('error');
                errorMsg.textContent = message;
                return false;
            } else {
                formGroup.classList.remove('error');
                errorMsg.textContent = '';
                return true;
            }
        }

        // Real-time validation
        Object.keys(formInputs).forEach(key => {
            const input = formInputs[key];
            if (input) {
                input.addEventListener('blur', () => {
                    validateField(input, patterns[key], messages[key]);
                });

                input.addEventListener('input', () => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup.classList.contains('error')) {
                        validateField(input, patterns[key], messages[key]);
                    }
                });
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            Object.keys(formInputs).forEach(key => {
                if (!validateField(formInputs[key], patterns[key], messages[key])) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('.btn-submit');
                const originalText = submitBtn.querySelector('span').textContent;
                
                submitBtn.disabled = true;
                submitBtn.querySelector('span').textContent = 'Sending...';

                // Simulate API call
                setTimeout(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = originalText;

                    // Hide status message after 5 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                    }, 5000);
                }, 2000);
            } else {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Please correct the errors above.';
                
                setTimeout(() => {
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }

    // =========================================================================
    // BACK TO TOP BUTTON
    // =========================================================================

    /**
     * Initialize back to top button
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================================================
    // SMOOTH SCROLL
    // =========================================================================

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just '#'
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =========================================================================
    // PAGE TRANSITIONS
    // =========================================================================

    /**
     * Add fade-in effect to sections as they enter viewport
     */
    function initPageTransitions() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }, 0);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    }

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================

    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for performance optimization
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // =========================================================================
    // INITIALIZE APPLICATION
    // =========================================================================

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add page transition effects
    initPageTransitions();

    // Performance optimization: Debounce window resize events
    window.addEventListener('resize', debounce(() => {
        // Handle responsive adjustments here if needed
        console.log('Window resized');
    }, 250));

})();
