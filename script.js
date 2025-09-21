document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    let currentLang = 'ru';
    const langToggle = document.getElementById('langToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const scrollToTop = document.getElementById('scrollToTop');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementsByClassName('modal-close')[0];

    // Language toggle
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'ru' ? 'kz' : 'ru';
        langToggle.textContent = currentLang.toUpperCase();
        switchLanguage();
    });

    function switchLanguage() {
        const elements = document.querySelectorAll('[data-ru][data-kz]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${currentLang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    // Music control
    let musicPlayed = false;
    let userInteracted = false;

    musicToggle.addEventListener('click', function() {
        toggleMusic();
    });

    function toggleMusic() {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }

    function playMusic() {
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicPlayed = true;
        }).catch(error => {
            console.log('Auto-play prevented:', error);
        });
    }

    function pauseMusic() {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
    }

    // Auto-play music on user interaction
    function handleUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            if (!musicPlayed) {
                playMusic();
            }
        }
    }

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    // Hamburger menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal functionality
    function openModal(img) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
    }

    // Add click event to all images that should open in modal
    const modalImages = document.querySelectorAll('img[onclick="openModal(this)"]');
    modalImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Video auto-play on scroll
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.closest('.hero-background')) return; // Skip hero video
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(error => {
                        console.log('Video auto-play prevented:', error);
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(video);
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.section, .veteran-info, .award-item, .document-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Preload critical images
    const criticalImages = [
        'photo.jpg',
        'berlin.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Initialize language
    switchLanguage();

    // Initialize scroll position
    window.scrollTo(0, 0);

    // Handle page visibility for music
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (!backgroundMusic.paused) {
                pauseMusic();
            }
        } else {
            if (musicPlayed && userInteracted) {
                playMusic();
            }
        }
    });

    // Error handling for missing media
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.addEventListener('error', function() {
            console.log('Video failed to load:', video.src);
            video.style.display = 'none';
        });
    });

    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', img.src);
            // Use a placeholder or hide the image
            img.style.opacity = '0.5';
            img.alt = 'Image not available';
        });
    });

    // Background music error handling
    backgroundMusic.addEventListener('error', function() {
        console.log('Background music failed to load');
        musicToggle.style.display = 'none';
    });

    // Add lazy loading for images
    const lazyImages = document.querySelectorAll('img[src]');
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Scroll-based animations and effects
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Optimize mobile performance
    if (window.innerWidth < 768) {
        // Reduce animations on mobile
        document.body.classList.add('mobile');
        
        // Reduce video quality or disable autoplay on mobile
        videos.forEach(video => {
            video.preload = 'metadata';
        });
    }

    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(event) {
        touchEndY = event.changedTouches[0].screenY;
        handleGesture();
    });

    function handleGesture() {
        if (touchEndY < touchStartY - 50) {
            // Swiped up
            handleUserInteraction();
        }
        if (touchEndY > touchStartY + 50) {
            // Swiped down
            handleUserInteraction();
        }
    }

    console.log('Memorial site initialized successfully');
});

