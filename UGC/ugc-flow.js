/**
 * UGC Flow Animation
 * 
 * Scroll-triggered animation that draws a connecting line
 * from the product image to the video result.
 * 
 * - Triggers once when section enters viewport
 * - Plays video after animation completes
 * - Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Configuration
  const ANIMATION_DURATION = 1200; // Total animation time in ms
  const VIDEO_START_DELAY = 800;   // When to start video (after line draws)

  // State
  let hasTriggered = false;
  let prefersReducedMotion = false;

  // DOM elements
  let section = null;
  let resultVideo = null;

  /**
   * Initialize the flow animation
   */
  function init() {
    section = document.querySelector('.ugc-flow');
    const resultCard = document.querySelector('.ugc-flow__result');
    resultVideo = resultCard?.querySelector('video');

    if (!section) {
      return; // Section not found
    }

    // Check reduced motion preference
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup scroll observer
    setupScrollObserver();

    // Listen for preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      prefersReducedMotion = e.matches;
    });
  }

  /**
   * Setup IntersectionObserver for scroll trigger
   */
  function setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          triggerAnimation();
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(section);
  }

  /**
   * Trigger the flow animation sequence
   */
  function triggerAnimation() {
    // Add animated class to start CSS animations
    section.classList.add('is-animated');

    // Start video after line draws
    const delay = prefersReducedMotion ? 0 : VIDEO_START_DELAY;
    
    setTimeout(() => {
      playVideo();
    }, delay);
  }

  /**
   * Start video playback
   */
  function playVideo() {
    if (resultVideo) {
      resultVideo.currentTime = 0;
      resultVideo.play().catch(() => {
        // Autoplay blocked, handle silently
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

