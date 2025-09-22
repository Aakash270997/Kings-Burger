// GSAP Animations
gsap.registerPlugin();

// Initialize Hero Slider
function initHeroSlider() {
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
    effect: 'slide',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        // Animate slide content
        const activeSlide = this.slides[this.activeIndex];
        const title = activeSlide.querySelector('h1');
        const paragraph = activeSlide.querySelector('p');
        const buttons = activeSlide.querySelectorAll('button');

        // Reset and animate
        gsap.fromTo([title, paragraph, ...buttons],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
          }
        );
      }
    }
  });

  return heroSwiper;
}

// Enhanced hero section animation
function animateHeroContent() {
  const firstSlide = document.querySelector('.swiper-slide:first-child');
  const title = firstSlide.querySelector('h1');
  const paragraph = firstSlide.querySelector('p');
  const buttons = firstSlide.querySelectorAll('button');
  const badge = firstSlide.querySelector('.bg-red-500');

  const tl = gsap.timeline();

  tl.from(badge, {
    duration: 0.8,
    scale: 0,
    rotation: 180,
    ease: "back.out(1.7)"
  })
    .from(title, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5")
    .from(paragraph, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.7")
    .from(buttons, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.5");
}

// Scroll animations
function animateOnScroll() {
  const sections = document.querySelectorAll('.section-reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// Food card hover animations
function setupCardAnimations() {
  const cards = document.querySelectorAll('.food-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -10,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        ease: "power2.out"
      });
    });
  });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut"
        });
      }
    });
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    gsap.fromTo(counter,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        stagger: 0.2
      }
    );
  });
}

// Parallax effect for hero section
function setupParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animate-float');

    if (parallax) {
      gsap.to(parallax, {
        duration: 0.5,
        y: scrolled * 0.5,
        ease: "power1.out"
      });
    }
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuButton = document.querySelector('.md\\:hidden button');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      // Toggle mobile menu (you would need to add the mobile menu HTML)
      console.log('Mobile menu toggled');
    });
  }
}

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', function () {
  // Initialize hero slider first
  initHeroSlider();

  // Then run other initializations
  animateOnScroll();
  setupCardAnimations();
  setupSmoothScroll();
  setupParallax();
  setupMobileMenu();

  // Animate initial hero content
  setTimeout(() => {
    animateHeroContent();
  }, 500);

  // Add loading animation
  gsap.to('.hero-bg', {
    duration: 0.8,
    opacity: 1,
    ease: "power2.out"
  });

  // Stagger animation for menu items
  gsap.from('.food-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.food-card',
      start: 'top 80%',
      end: 'bottom 20%',
    }
  });
});

// Add some interactive features
const orderButtons = document.querySelectorAll('.btn-primary');
orderButtons.forEach(button => {
  button.addEventListener('click', function (e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});



// Mobile menu open/close
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    mobileMenuBtn.onclick = () => mobileMenu.classList.remove('hidden');
    closeMobileMenu.onclick = () => mobileMenu.classList.add('hidden');
    mobileMenu.onclick = (e) => {
      if (e.target === mobileMenu) mobileMenu.classList.add('hidden');
    };

    // Mobile dropdowns
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      btn.onclick = function () {
        const dropdown = this.parentElement.querySelector('.mobile-dropdown');

        dropdown.classList.toggle('hidden');
        dropdown.classList.toggle('flex');
      };
    });

    // Category Swiper
     var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    });
    new Swiper('.category-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      pagination: {
        el: '.category-swiper .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      }
    });


    // Follow BravisThemes Swiper
    var swiper1 = new Swiper(".mySwiper1", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    });