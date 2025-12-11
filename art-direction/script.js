// VERV Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // FAQ Toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    
    if (toggle) {
      toggle.addEventListener('click', function() {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('faq-item-open')) {
            otherItem.classList.remove('faq-item-open');
            const otherToggle = otherItem.querySelector('.faq-toggle');
            if (otherToggle) {
              otherToggle.classList.remove('faq-toggle-open');
            }
          }
        });
        
        // Toggle current item
        item.classList.toggle('faq-item-open');
        toggle.classList.toggle('faq-toggle-open');
      });
    }
  });

  // Smooth scroll for anchor links
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

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.hero-card, .style-card, .preset-card, .section-title').forEach(el => {
    observer.observe(el);
  });

  // Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      navbar.style.background = 'transparent';
    }
    
    lastScroll = currentScroll;
  });

  // Testimonial Carousel functionality
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  if (testimonialTrack && testimonialCards.length > 0) {
    let currentPage = 0;
    const totalCards = testimonialCards.length;
    
    // Get cards per page based on viewport
    function getCardsPerPage() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    
    // Get total pages based on cards per page
    function getTotalPages() {
      return Math.ceil(totalCards / getCardsPerPage());
    }
    
    // Update dots to match current page count
    function updateDotsCount() {
      const totalPages = getTotalPages();
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot' + (i === currentPage ? ' active' : '');
        dot.addEventListener('click', () => slideToPage(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    // Update dots to reflect current page
    function updateDots(pageIndex) {
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === pageIndex);
      });
    }
    
    // Slide to specific page
    function slideToPage(pageIndex) {
      const cardsPerPage = getCardsPerPage();
      const totalPages = getTotalPages();
      
      // Ensure page index is valid
      if (pageIndex >= totalPages) pageIndex = 0;
      if (pageIndex < 0) pageIndex = totalPages - 1;
      
      // Calculate the offset based on card width + gap
      // Each card takes up (100% - total gaps) / cardsPerPage
      const gap = window.innerWidth <= 768 ? 16 : 24;
      const trackWidth = testimonialTrack.offsetWidth;
      const totalGaps = (cardsPerPage - 1) * gap;
      const cardWidth = (trackWidth - totalGaps) / cardsPerPage;
      const cardWithGap = cardWidth + gap;
      
      // Move by cardsPerPage cards
      const offsetPx = pageIndex * cardsPerPage * cardWithGap;
      
      testimonialTrack.style.transform = `translateX(-${offsetPx}px)`;
      currentPage = pageIndex;
      updateDots(pageIndex);
    }
    
    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const totalPages = getTotalPages();
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        slideToPage(currentPage);
      });
    }
    
    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = getTotalPages();
        currentPage = (currentPage + 1) % totalPages;
        slideToPage(currentPage);
      });
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const totalPages = getTotalPages();
        if (currentPage >= totalPages) currentPage = totalPages - 1;
        updateDotsCount();
        slideToPage(currentPage);
      }, 100);
    });
    
    // Initialize
    updateDotsCount();
  }
});
