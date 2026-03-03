document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scroll and active link highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Add scroll event listener
    window.addEventListener("scroll", () => {
        let current = "";
        
        // Find which section is currently in view
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        // Update active class on nav links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
        
        // Add glass nav background on scroll
        const header = document.querySelector(".glass-nav");
        if (window.scrollY > 50) {
            header.style.background = "rgba(13, 15, 26, 0.85)";
            header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(13, 15, 26, 0.6)";
            header.style.boxShadow = "none";
        }
    });

    // 2. Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on child index if it's a grid item
                const target = entry.target;
                
                if (target.classList.contains('skill-category') || target.classList.contains('edu-item')) {
                    const delay = Array.from(target.parentElement.children).indexOf(target) * 0.1;
                    target.style.transitionDelay = `${delay}s`;
                }
                
                target.classList.add('show');
                
                // Optional: to keep element shown after scroll
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe all hidden elements
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
    
    // Additional effect: Add mouse move effect for hero background
    const heroSection = document.querySelector('.hero');
    const shape1 = document.querySelector('.shape1');
    const shape2 = document.querySelector('.shape2');
    const shape3 = document.querySelector('.shape3');
    
    if (heroSection && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shape1.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
            shape2.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
            shape3.style.transform = `translate(${x * -30}px, ${y * 30}px)`;
        });
    }
});
