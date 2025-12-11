// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    
    toggle.addEventListener('click', function() {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('faq-item-open')) {
          otherItem.classList.remove('faq-item-open');
          const otherToggle = otherItem.querySelector('.faq-toggle');
          otherToggle.classList.remove('faq-toggle-open');
          // Update SVG direction
          const otherSvg = otherToggle.querySelector('svg path');
          otherSvg.setAttribute('d', 'M5 7.5L10 12.5L15 7.5');
        }
      });
      
      // Toggle current item
      item.classList.toggle('faq-item-open');
      toggle.classList.toggle('faq-toggle-open');
      
      // Update SVG direction
      const svg = toggle.querySelector('svg path');
      if (item.classList.contains('faq-item-open')) {
        svg.setAttribute('d', 'M5 12.5L10 7.5L15 12.5');
      } else {
        svg.setAttribute('d', 'M5 7.5L10 12.5L15 7.5');
      }
    });
  });
});



