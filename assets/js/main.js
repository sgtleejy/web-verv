/**
 * VERV Landing Page - Main JavaScript
 * Consolidated script for all page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // FAQ Toggle Functionality
  // ============================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
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
                // Update SVG direction if present
                const otherSvg = otherToggle.querySelector('svg path');
                if (otherSvg) {
                  otherSvg.setAttribute('d', 'M5 7.5L10 12.5L15 7.5');
                }
              }
            }
          });
          
          // Toggle current item
          item.classList.toggle('faq-item-open');
          toggle.classList.toggle('faq-toggle-open');
          
          // Update SVG direction if present
          const svg = toggle.querySelector('svg path');
          if (svg) {
            if (item.classList.contains('faq-item-open')) {
              svg.setAttribute('d', 'M5 12.5L10 7.5L15 12.5');
            } else {
              svg.setAttribute('d', 'M5 7.5L10 12.5L15 7.5');
            }
          }
        });
      }
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // Intersection Observer for Scroll Animations
  // ============================================
  function initScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.hero-card, .style-card, .preset-card, .section-title');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // Navigation Scroll Effect
  // ============================================
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
      } else {
        navbar.style.background = 'transparent';
      }
    });
  }

  // ============================================
  // Testimonial Carousel
  // ============================================
  function initTestimonialCarousel() {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (!testimonialTrack || testimonialCards.length === 0) return;
    
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
      if (!dotsContainer) return;
      
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
      if (!dotsContainer) return;
      
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

  // ============================================
  // Feature Stack Media Switcher (Product Ads)
  // ============================================
  function initFeatureMediaSwitcher() {
    const items = document.querySelectorAll('.feature-item');
    const mediaItems = document.querySelectorAll('.stack-media > [data-feature]');
    
    if (items.length === 0 || mediaItems.length === 0) return;

    // Function to switch active media
    function switchMedia(featureKey) {
      mediaItems.forEach(media => {
        if (media.dataset.feature === featureKey) {
          media.classList.add('active');
          // Play video if it's a video element
          if (media.tagName === 'VIDEO') {
            media.play();
          }
        } else {
          media.classList.remove('active');
          // Pause video if it's a video element
          if (media.tagName === 'VIDEO') {
            media.pause();
          }
        }
      });
    }

    // Set initial active state for media (photography is default)
    switchMedia('photography');

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Remove active from all items
        items.forEach(i => i.classList.remove('active'));
        // Set active on the hovered one
        item.classList.add('active');
        
        // Switch the media content
        const featureKey = item.dataset.feature;
        switchMedia(featureKey);
      });
    });
  }

  // ============================================
  // Initialize All Modules
  // ============================================
  initFAQ();
  initSmoothScroll();
  initScrollAnimations();
  initNavbarScroll();
  initTestimonialCarousel();
  initFeatureMediaSwitcher();
});

// ============================================
// Audio Toggle for Video Cards (UGC)
// Global function for onclick handlers
// ============================================
function toggleAudio(button) {
  // Get the video card container
  const videoCard = button.closest('.video-card');
  if (!videoCard) return;
  
  const video = videoCard.querySelector('video');
  if (!video) return;
  
  // Get the icon elements
  const iconMuted = button.querySelector('.icon-muted');
  const iconUnmuted = button.querySelector('.icon-unmuted');
  
  // Mute all other videos first
  document.querySelectorAll('.video-card video').forEach(v => {
    if (v !== video) {
      v.muted = true;
      const otherCard = v.closest('.video-card');
      const otherBtn = otherCard.querySelector('.audio-btn');
      if (otherBtn) {
        const otherIconMuted = otherBtn.querySelector('.icon-muted');
        const otherIconUnmuted = otherBtn.querySelector('.icon-unmuted');
        if (otherIconMuted) otherIconMuted.style.display = 'block';
        if (otherIconUnmuted) otherIconUnmuted.style.display = 'none';
      }
    }
  });
  
  // Toggle mute state for clicked video
  if (video.muted) {
    video.muted = false;
    if (iconMuted) iconMuted.style.display = 'none';
    if (iconUnmuted) iconUnmuted.style.display = 'block';
  } else {
    video.muted = true;
    if (iconMuted) iconMuted.style.display = 'block';
    if (iconUnmuted) iconUnmuted.style.display = 'none';
  }
}

